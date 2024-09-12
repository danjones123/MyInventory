FROM azul/zulu-openjdk:17-latest
VOLUME /tmp
WORKDIR /app
COPY build/libs/*.jar app.jar
ENTRYPOINT ["java","-jar","app.jar"]