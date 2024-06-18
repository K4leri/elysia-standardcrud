FROM oven/bun:1 as base
WORKDIR /app

LABEL org.opencontainers.image.authors="K4leri"

# install with --production (exclude devDependencies)
FROM base AS install
RUN mkdir -p /temp/prod
# COPY app/package.json app/bun.lockb /temp/prod/
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# copy node_modules from temp directory
# then copy all (non-ignored) project files into the image
FROM base AS prerelease
COPY --from=install /temp/prod/node_modules node_modules
COPY . .

# # [optional] tests & build
# ENV NODE_ENV=production
# RUN bun test
# RUN bun run build

# copy production dependencies and source code into final image
FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /app .

# Set environment variables if needed
ENV ACCESS_SECRET="ewg lkmjfio2n o3ijri23j 9393iommmk9(*&#(*$(jnmf weihfn" \
    REFRESH_SECRET="ewg lkmjfio2n o3ijri23j 9393iommmk9(*&#(*$(jnmf weihfn"
    
USER bun
EXPOSE 3000/tcp
# CMD ["bun", "run", "app/src/index.ts"]
# CMD ["bun", "run", "src/db/migrate.ts"]
CMD ["bun", "run", "start"]
# CMD ["/bin/sh"]
