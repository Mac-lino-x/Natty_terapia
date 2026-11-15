// =====================================================
// CONFIGURAÇÃO ÚNICA DO SUPABASE
// Preencha aqui (Supabase > Project Settings > API).
// Use SOMENTE a chave "anon public". NUNCA use a "service_role".
// =====================================================
const SUPABASE_URL = 'SUA_URL_AQUI';
const SUPABASE_KEY = 'SUA_ANON_KEY_AQUI';

// Cliente global usado por index, pre, pos e admin: window.db
window.db = null;
try {
  if (
    typeof supabase !== 'undefined' &&
    SUPABASE_URL && SUPABASE_URL !== 'SUA_URL_AQUI' &&
    SUPABASE_KEY && SUPABASE_KEY !== 'SUA_ANON_KEY_AQUI'
  ) {
    window.db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  } else {
    console.warn('Supabase não configurado: edite config.js com sua URL e anon key.');
  }
} catch (err) {
  console.warn('Falha ao iniciar o Supabase:', err);
}

// Escapa texto vindo de usuários antes de inserir em HTML (evita XSS)
window.escapeHtml = function (valor) {
  return String(valor ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};
