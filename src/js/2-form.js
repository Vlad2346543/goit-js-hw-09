// Ключ для локального сховища
const STORAGE_KEY = "feedback-form-state";

// 1. Оголошення об'єкта formData
const formData = {
  email: "",
  message: "",
};

// Посилання на елементи DOM
const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageTextarea = form.elements.message;

// --- 2. Функція заповнення форми зі сховища (При завантаженні сторінки) ---
function loadFormState() {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    
    // Перевіряємо, чи є дані у сховищі
    if (serializedState) {
      const savedState = JSON.parse(serializedState);
      
      // Перезаписуємо об'єкт formData зі збереженими даними
      Object.assign(formData, savedState);

      // Заповнюємо поля форми
      emailInput.value = formData.email || "";
      messageTextarea.value = formData.message || "";
    }
  } catch (error) {
    console.error("Помилка при читанні зі сховища: ", error.message);
  }
}

// Викликаємо функцію для завантаження даних при першому завантаженні сторінки
loadFormState();


// --- 3. Обробник події input (Збереження у сховище) ---
// Використовуємо делегування, прив'язуючи обробник до всієї форми
form.addEventListener('input', (event) => {
  // Зберігаємо актуальне значення у formData
  const { name, value } = event.target;
  formData[name] = value.trim(); // .trim() видаляє пробіли на початку/кінці

  // Записуємо оновлений об'єкт у локальне сховище
  try {
    const serializedState = JSON.stringify(formData);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (error) {
    console.error("Помилка при записі у сховище: ", error.message);
  }
});


// --- 4. Обробник події submit (Відправлення форми) ---
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Запобігаємо стандартній відправці форми

  // Перевірка на заповненість полів
  if (!formData.email || !formData.message) {
    alert("Fill please all fields"); // Сповіщення, якщо не всі поля заповнені
    return; // Перериваємо виконання
  }

  // 1. Виводимо у консоль об’єкт formData
  console.log("Дані форми для відправки:", formData);
  
  // 2. Очищуємо локальне сховище
  localStorage.removeItem(STORAGE_KEY);

  // 3. Очищуємо поля форми (скидаємо їх до початкових значень)
  form.reset();
  
  // 4. Очищуємо об’єкт formData
  // Можна скинути ключі до порожніх рядків
  formData.email = "";
  formData.message = "";
});