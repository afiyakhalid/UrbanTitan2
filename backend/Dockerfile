FROM eclipse-temurin:25-jdk AS build
WORKDIR /workspace

COPY gradlew gradlew
COPY gradlew.bat gradlew.bat
COPY build.gradle settings.gradle ./
COPY gradle/ gradle/
COPY src/ src/

RUN chmod +x ./gradlew && ./gradlew bootJar -x test
FROM eclipse-temurin:25-jre
WORKDIR /app
ENV PORT=8080
ENV SPRING_PROFILES_ACTIVE=remote

COPY --from=build /workspace/build/libs/*.jar /app/app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]