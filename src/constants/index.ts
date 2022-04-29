/**
 * 현재 스테이지
 */
export const STAGE =
  (process.env.STAGE as 'development' | 'production') ?? 'development'

/**
 * 포트
 */
export const PORT = process.env.PORT ?? 3000

/**
 * host
 */
export const HOST = (process.env.HOST as string) ?? 'localhost'

/**
 * db_uri
 */
export const DB_URI =
  (process.env.DB_URI as string) ??
  'mongodb://user:hello@localhost:27017/test?authSource=admin&w=1'
