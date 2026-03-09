/**
 * Verify database connection and fetch properties.
 * Run: npx tsx scripts/check-db.ts
 * (Ensure .env exists with DATABASE_URL and PAYLOAD_SECRET)
 */
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const envPath = resolve(root, '.env');

if (existsSync(envPath)) {
  const env = readFileSync(envPath, 'utf8');
  for (const line of env.split('\n')) {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)$/);
    if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '').trim();
  }
}

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is not set. Create .env with DATABASE_URL.');
    process.exit(1);
  }
  console.log('Connecting to database...');
  try {
    const { getPayload } = await import('payload');
    const config = (await import('../payload.config')).default;
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: 'properties',
      limit: 5,
      depth: 0,
      overrideAccess: true,
    });
    const total = result.totalDocs ?? result.docs?.length ?? 0;
    console.log('OK: Database connected.');
    console.log('Properties count:', total);
    if (result.docs?.length) {
      console.log('Sample (id, name):', result.docs.map((d) => ({ id: String(d.id), name: (d as { name?: string }).name })));
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('Error:', message);
    process.exit(1);
  }
  process.exit(0);
}

main();
