# Supabase

`migrations/`에 순번이 붙은 SQL 마이그레이션을 둡니다. 현재는 psql로 직접 적용합니다 (세션 풀러: `aws-1-ap-northeast-2.pooler.supabase.com:5432`, 유저 `postgres.<project-ref>`).

**예정 (DEC): ORM은 Drizzle로 전환합니다.** 그때까지 마이그레이션은 plain SQL로 유지하고, 도입 시 drizzle-kit의 마이그레이션 폴더로 승계합니다. 브라우저 데이터 경로는 RLS 때문에 계속 Supabase 클라이언트(JWT)를 사용하며, Drizzle은 마이그레이션 도구와 서버측(엣지 함수) 코드에 적용합니다.

주의: 접속 비밀번호·서비스 롤 키는 리포에 절대 커밋하지 않습니다. 프런트엔드에는 anon key만 노출됩니다(`app/.env.local`, 커밋 제외).
