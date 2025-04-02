export function copyToClipboard(text: string) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Текст успешно скопирован в буфер обмена");
      })
      .catch((err) => {
        console.error(
          "Не удалось скопировать текст через navigator.clipboard: ",
          err
        );
        oldCopy(text);
      });
  } else {
    oldCopy(text);
  }
}

function oldCopy(text: string) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);

  textarea.select();
  textarea.setSelectionRange(0, 99999);

  try {
    const successful = document.execCommand("copy");
    if (successful) {
      console.log("Текст успешно скопирован в буфер обмена (fallback)");
    } else {
      console.error("Не удалось скопировать текст (fallback)");
    }
  } catch (err) {
    console.error("Ошибка при копировании текста (fallback): ", err);
  }

  document.body.removeChild(textarea);
}
