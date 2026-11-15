// =====================================================
// CONFIGURAÇÃO ÚNICA DO SUPABASE
// Use SOMENTE a chave publishable/anon. NUNCA use a secret ou service_role.
// =====================================================
const SUPABASE_URL = 'https://iqvswhyheslcrgdamfjl.supabase.co';
const SUPABASE_KEY = 'sb_publishable_gyKagkAct38CZuFtsNW7yA_Ihs59I29';

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
    console.warn('Supabase não configurado: edite config.js com sua URL e chave.');
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