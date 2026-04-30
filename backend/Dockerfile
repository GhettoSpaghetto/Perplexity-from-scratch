# Use the official Bun image
FROM oven/bun:1 AS base
WORKDIR /usr/src/app

# ==========================================
# STAGE 1: Install Dependencies
# ==========================================
FROM base AS install
# Install dev dependencies
RUN mkdir -p /temp/dev
COPY package.json bun.lock* /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# Install production dependencies only
RUN mkdir -p /temp/prod
COPY package.json bun.lock* /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# ==========================================
# STAGE 2: Build & Generate (Prisma)
# ==========================================
FROM base AS prerelease
# Copy dev dependencies so we have the Prisma CLI
COPY --from=install /temp/dev/node_modules node_modules
# Copy all your backend files (index.ts, db.ts, prisma folder, etc.)
COPY . .

# Generate the Prisma Client specifically for this Linux container
RUN bunx prisma generate

# ==========================================
# STAGE 3: Final Production Image
# ==========================================
FROM base AS release
# Copy the lean production dependencies
COPY --from=install /temp/prod/node_modules node_modules
# Copy all your app files and the generated Prisma client from the prerelease stage
COPY --from=prerelease /usr/src/app/ ./

# Run the app securely as the 'bun' user
USER bun

# Open the port your Express server uses
EXPOSE 3001/tcp

# Start the Express server
ENTRYPOINT [ "bun", "run", "index.ts" ]