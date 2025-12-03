/**
 * Admin utilities - проверка прав администратора
 */

// Список ID администраторов (можно добавить в .env.local)
// В Clerk можно найти User ID в дашборде
const ADMIN_USER_IDS = (process.env.ADMIN_USER_IDS || '').split(',').filter(Boolean);

/**
 * Проверяет, является ли пользователь администратором
 * @param userId - ID пользователя из Clerk
 * @returns true если пользователь админ
 */
export function isAdmin(userId: string | null | undefined): boolean {
  if (!userId) return false;
  
  // Проверка по списку из env
  if (ADMIN_USER_IDS.length > 0 && ADMIN_USER_IDS.includes(userId)) {
    return true;
  }
  
  // Fallback: если нет настроенных админов, разрешаем доступ
  // В продакшене это нужно убрать и настроить ADMIN_USER_IDS
  if (ADMIN_USER_IDS.length === 0) {
    console.warn('⚠️ ADMIN_USER_IDS not configured - allowing access to all authenticated users');
    return true; // Временно разрешаем всем залогиненным
  }
  
  return false;
}

