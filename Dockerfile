# syntax=docker/dockerfile:1

# ---- Stage 1: build the frontend ----
FROM node:20-alpine AS frontend-build
WORKDIR /frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# ---- Stage 2: build the backend (Quarkus JVM/fast-jar) ----
FROM maven:3.9-eclipse-temurin-21 AS backend-build
WORKDIR /backend
COPY backend/pom.xml ./
# Warm the dependency cache before copying source, so source-only edits don't refetch deps
RUN mvn -B dependency:go-offline
COPY backend/src ./src

# Drop the built frontend straight into Quarkus's static resources folder
COPY --from=frontend-build /frontend/dist ./src/main/resources/META-INF/resources

RUN mvn -B package -DskipTests

# ---- Stage 3: runtime ----
FROM eclipse-temurin:21-jre-alpine AS runtime
WORKDIR /app

# Quarkus fast-jar layout
COPY --from=backend-build /backend/target/quarkus-app/lib/ ./lib/
COPY --from=backend-build /backend/target/quarkus-app/*.jar ./
COPY --from=backend-build /backend/target/quarkus-app/app/ ./app/
COPY --from=backend-build /backend/target/quarkus-app/quarkus/ ./quarkus/

# Cloud Run sets PORT; Quarkus reads QUARKUS_HTTP_PORT
ENV QUARKUS_HTTP_PORT=8080
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "quarkus-run.jar"]
