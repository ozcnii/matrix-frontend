export function aiogramEncodePayload(payload: string): string {
  // 1) Превращаем в байты (UTF-8)
  const utf8encoder = new TextEncoder();
  const payloadBytes = utf8encoder.encode(payload);

  // 2) Превращаем байты в обычную base64
  let base64 = btoa(String.fromCharCode(...payloadBytes));

  // 3) Делаем base64 «URL-safe» (как в urlsafe_b64encode) и удаляем "="
  base64 = base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

  return base64;
}

/**
 * Генерирует ссылку типа https://t.me/<bot_username>?start=<payload>
 * чтобы бот (aiogram) мог потом прочитать и декодировать
 */
export function getStartLink(
  botUsername: string,
  payload: string,
  encode = true
): string {
  // Если encode=false, можем оставить без base64.
  // Но для совместимости с aiogram (encode=True) — кодируем
  const param = encode ? aiogramEncodePayload(payload) : payload;

  return `https://t.me/${botUsername}?start=${param}`;
}
