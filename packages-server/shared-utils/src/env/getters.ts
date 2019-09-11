export function getEnvString(key: string): string {
  return process.env[key];
}

export function getEnvNumber(key: string): number {
  const value = +process.env[key];
  return isNaN(value) ? null : value;
}

export function getEnvBoolean(key: string): boolean {
  const value = (process.env[key] || '').trim().toLowerCase();
  return ['1', 'true'].includes(value);
}
