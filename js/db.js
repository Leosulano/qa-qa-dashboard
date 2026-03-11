// ── SUPABASE DATABASE OPERATIONS ─────────────────────────────────
// All functions are async and fire-and-forget safe.
// If window.db is null (Supabase not configured), they do nothing.

async function dbInsertMessage(questionId, role, text) {
  if (!window.db) return;
  const { error } = await window.db
    .from('messages')
    .insert({ question_id: questionId, role, text });
  if (error) console.error('[db] insertMessage:', error.message);
}

async function dbSetResolved(questionId, resolved) {
  if (!window.db) return;
  const { error } = await window.db
    .from('questions')
    .update({ resolved })
    .eq('id', questionId);
  if (error) console.error('[db] setResolved:', error.message);
}

async function dbDeleteQuestion(questionId) {
  if (!window.db) return;
  const { error } = await window.db
    .from('questions')
    .delete()
    .eq('id', questionId);
  if (error) console.error('[db] deleteQuestion:', error.message);
}

async function dbInsertQuestion(q) {
  if (!window.db) return;
  const { error } = await window.db
    .from('questions')
    .insert({ id: q.id, stage_id: q.stage, num: q.num, text: q.text, resolved: q.resolved });
  if (error) console.error('[db] insertQuestion:', error.message);
}

async function dbInsertStage(stage, sortOrder) {
  if (!window.db) return;
  const { error } = await window.db
    .from('stages')
    .insert({ id: stage.id, label: stage.label, emoji: stage.emoji, sort_order: sortOrder });
  if (error) console.error('[db] insertStage:', error.message);
}

async function dbDeleteStage(stageId) {
  if (!window.db) return;
  // ON DELETE CASCADE handles questions + messages automatically
  const { error } = await window.db
    .from('stages')
    .delete()
    .eq('id', stageId);
  if (error) console.error('[db] deleteStage:', error.message);
}
