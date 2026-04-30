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
# ==========================================
# STAGE 3: Final Production Image
# ==========================================
FROM base AS release

# Create a custom user within Choreo's required range (10000-20000)
RUN useradd --uid 10014 choreouser

# Copy dependencies and change ownership so the new user can read them
COPY --from=install --chown=10014:10014 /temp/prod/node_modules node_modules

# Copy app files and generated Prisma client, changing ownership
COPY --from=prerelease --chown=10014:10014 /usr/src/app/ ./

# Switch to the Choreo-approved User ID
USER 10014

# Open the port your Express server uses
EXPOSE 3001/tcp

# Start the Express server
ENTRYPOINT [ "bun", "run", "index.ts" ]