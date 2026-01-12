package urbantitan.code.services;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import urbantitan.code.entities.Order;
import urbantitan.code.entities.OrderItem;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderNotificationService {

    private static final Logger log = LoggerFactory.getLogger(OrderNotificationService.class);

    private final JavaMailSender mailSender;

    @Value("${security.mail.from-address:no-reply@urbantitan.in}")
    private String fromAddress;

    @Value("${app.notification.fallback-email:ops@urbantitan.in}")
    private String fallbackEmail;

    @Async
    public void notifyDealersForOrder(Order order) {
        Map<String, List<OrderItem>> itemsByDealerEmail = order.getOrderItems().stream()
            .filter(item -> item.getDealerEmail() != null && !item.getDealerEmail().isBlank())
            .collect(Collectors.groupingBy(OrderItem::getDealerEmail));

        if (itemsByDealerEmail.isEmpty()) {
            log.info("No dealer emails found for order {}; sending to fallback", order.getOrderNumber());
            sendDealerNotification(fallbackEmail, "UrbanTitan Ops", order, order.getOrderItems());
            return;
        }

        for (Map.Entry<String, List<OrderItem>> entry : itemsByDealerEmail.entrySet()) {
            String dealerEmail = entry.getKey();
            List<OrderItem> dealerItems = entry.getValue();
            String dealerName = dealerItems.get(0).getDealerName();
            sendDealerNotification(dealerEmail, dealerName != null ? dealerName : "Dealer", order, dealerItems);
        }
    }

    private void sendDealerNotification(String toEmail, String dealerName, Order order, List<OrderItem> items) {
        String subject = "New Order Received - " + order.getOrderNumber();
        String html = buildDealerNotificationHtml(dealerName, order, items);

        var message = mailSender.createMimeMessage();
        try {
            var helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(toEmail);
            helper.setSubject(subject);

            try {
                helper.setFrom(new InternetAddress(fromAddress, "UrbanTitan Orders"));
            } catch (Exception ex) {
                helper.setFrom(fromAddress);
            }

            helper.setText(html, true);
            mailSender.send(message);
            log.info("Order notification sent to {} for order {}", toEmail, order.getOrderNumber());
        } catch (MailException | MessagingException ex) {
            log.error("Failed to send order notification to {} for order {}", toEmail, order.getOrderNumber(), ex);
        }
    }

    private String buildDealerNotificationHtml(String dealerName, Order order, List<OrderItem> items) {
        StringBuilder itemRows = new StringBuilder();
        for (OrderItem item : items) {
            itemRows.append("<tr>")
                .append("<td style=\"padding:10px;border-bottom:1px solid #e5e7eb;\">").append(item.getProductName()).append("</td>")
                .append("<td style=\"padding:10px;border-bottom:1px solid #e5e7eb;text-align:center;\">").append(item.getQuantity()).append("</td>")
                .append("<td style=\"padding:10px;border-bottom:1px solid #e5e7eb;text-align:right;\">₹").append(item.getUnitPrice()).append("</td>")
                .append("<td style=\"padding:10px;border-bottom:1px solid #e5e7eb;text-align:right;\">₹").append(item.getTotalPrice()).append("</td>")
                .append("</tr>");
        }

        String shippingInfo = String.format("%s<br>%s<br>%s%s<br>%s, %s - %s<br>Phone: %s",
            order.getShippingName() != null ? order.getShippingName() : "",
            order.getShippingAddressLine1() != null ? order.getShippingAddressLine1() : "",
            order.getShippingAddressLine2() != null ? order.getShippingAddressLine2() + "<br>" : "",
            order.getShippingCity() != null ? order.getShippingCity() : "",
            order.getShippingState() != null ? order.getShippingState() : "",
            order.getShippingPincode() != null ? order.getShippingPincode() : "",
            order.getShippingPhone() != null ? order.getShippingPhone() : ""
        );

        return """
            <!doctype html>
            <html lang="en">
              <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>New Order</title>
              </head>
              <body style="margin:0;padding:0;background:#f6f7fb;font-family:Arial,Helvetica,sans-serif;">
                <div style="max-width:600px;margin:0 auto;padding:24px;">
                  <div style="background:#ffffff;border-radius:12px;box-shadow:0 6px 18px rgba(0,0,0,0.08);overflow:hidden;">
                    <div style="padding:20px;background:#fff7ed;border-bottom:1px solid #fde7c7;">
                      <div style="font-size:20px;font-weight:700;color:#111827;">UrbanTitan</div>
                      <div style="font-size:12px;color:#6b7280;margin-top:2px;">New Order Notification</div>
                    </div>
                    <div style="padding:24px;">
                      <p style="margin:0 0 16px;font-size:15px;color:#111827;">Hello <strong>%s</strong>,</p>
                      <p style="margin:0 0 20px;font-size:14px;color:#374151;">You have received a new order. Please review the details below:</p>
                      
                      <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:14px;margin-bottom:20px;">
                        <div style="font-size:13px;color:#6b7280;">Order Number</div>
                        <div style="font-size:16px;font-weight:600;color:#111827;">%s</div>
                      </div>
                      
                      <table style="width:100%%;border-collapse:collapse;font-size:13px;margin-bottom:20px;">
                        <thead>
                          <tr style="background:#f3f4f6;">
                            <th style="padding:10px;text-align:left;border-bottom:2px solid #e5e7eb;">Product</th>
                            <th style="padding:10px;text-align:center;border-bottom:2px solid #e5e7eb;">Qty</th>
                            <th style="padding:10px;text-align:right;border-bottom:2px solid #e5e7eb;">Unit Price</th>
                            <th style="padding:10px;text-align:right;border-bottom:2px solid #e5e7eb;">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          %s
                        </tbody>
                      </table>
                      
                      <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:14px;margin-bottom:20px;">
                        <div style="font-size:13px;font-weight:600;color:#374151;margin-bottom:8px;">Delivery Address</div>
                        <div style="font-size:13px;color:#6b7280;line-height:1.6;">%s</div>
                      </div>
                      
                      <div style="background:#fef3c7;border:1px solid #fcd34d;border-radius:8px;padding:14px;">
                        <div style="font-size:13px;color:#92400e;">Please prepare the items for dispatch. You will receive shipping details once the order is confirmed.</div>
                      </div>
                    </div>
                  </div>
                  <div style="text-align:center;font-size:11px;color:#9ca3af;margin-top:16px;">© UrbanTitan</div>
                </div>
              </body>
            </html>
            """.formatted(dealerName, order.getOrderNumber(), itemRows.toString(), shippingInfo);
    }

    @Async
    public void sendOrderConfirmationToCustomer(Order order, String customerEmail) {
        String subject = "Order Confirmed - " + order.getOrderNumber();
        String html = buildCustomerConfirmationHtml(order);

        var message = mailSender.createMimeMessage();
        try {
            var helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(customerEmail);
            helper.setSubject(subject);

            try {
                helper.setFrom(new InternetAddress(fromAddress, "UrbanTitan"));
            } catch (Exception ex) {
                helper.setFrom(fromAddress);
            }

            helper.setText(html, true);
            mailSender.send(message);
            log.info("Order confirmation sent to customer {} for order {}", customerEmail, order.getOrderNumber());
        } catch (MailException | MessagingException ex) {
            log.error("Failed to send order confirmation to {} for order {}", customerEmail, order.getOrderNumber(), ex);
        }
    }

    private String buildCustomerConfirmationHtml(Order order) {
        StringBuilder itemRows = new StringBuilder();
        for (OrderItem item : order.getOrderItems()) {
            itemRows.append("<tr>")
                .append("<td style=\"padding:10px;border-bottom:1px solid #e5e7eb;\">").append(item.getProductName()).append("</td>")
                .append("<td style=\"padding:10px;border-bottom:1px solid #e5e7eb;text-align:center;\">").append(item.getQuantity()).append("</td>")
                .append("<td style=\"padding:10px;border-bottom:1px solid #e5e7eb;text-align:right;\">₹").append(item.getTotalPrice()).append("</td>")
                .append("</tr>");
        }

        return """
            <!doctype html>
            <html lang="en">
              <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Order Confirmed</title>
              </head>
              <body style="margin:0;padding:0;background:#f6f7fb;font-family:Arial,Helvetica,sans-serif;">
                <div style="max-width:600px;margin:0 auto;padding:24px;">
                  <div style="background:#ffffff;border-radius:12px;box-shadow:0 6px 18px rgba(0,0,0,0.08);overflow:hidden;">
                    <div style="padding:20px;background:#dcfce7;border-bottom:1px solid #86efac;">
                      <div style="font-size:20px;font-weight:700;color:#111827;">UrbanTitan</div>
                      <div style="font-size:12px;color:#166534;margin-top:2px;">Order Confirmed ✓</div>
                    </div>
                    <div style="padding:24px;">
                      <p style="margin:0 0 16px;font-size:15px;color:#111827;">Thank you for your order!</p>
                      
                      <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:14px;margin-bottom:20px;">
                        <div style="font-size:13px;color:#6b7280;">Order Number</div>
                        <div style="font-size:16px;font-weight:600;color:#111827;">%s</div>
                        <div style="font-size:13px;color:#6b7280;margin-top:8px;">Total Amount</div>
                        <div style="font-size:18px;font-weight:700;color:#111827;">₹%s</div>
                      </div>
                      
                      <table style="width:100%%;border-collapse:collapse;font-size:13px;margin-bottom:20px;">
                        <thead>
                          <tr style="background:#f3f4f6;">
                            <th style="padding:10px;text-align:left;border-bottom:2px solid #e5e7eb;">Product</th>
                            <th style="padding:10px;text-align:center;border-bottom:2px solid #e5e7eb;">Qty</th>
                            <th style="padding:10px;text-align:right;border-bottom:2px solid #e5e7eb;">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          %s
                        </tbody>
                      </table>
                      
                      <p style="font-size:13px;color:#6b7280;margin:0;">We'll notify you when your order ships.</p>
                    </div>
                  </div>
                  <div style="text-align:center;font-size:11px;color:#9ca3af;margin-top:16px;">© UrbanTitan</div>
                </div>
              </body>
            </html>
            """.formatted(order.getOrderNumber(), order.getTotalAmount(), itemRows.toString());
    }
}
