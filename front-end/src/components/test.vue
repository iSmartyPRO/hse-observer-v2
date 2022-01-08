<template>
  <div>
    <!-- При нажатии на button появлялся окно с выбором файла -->
    <button @click="showFileChoose">Выбрать аватар</button>

    <!-- Полагаю должен срабатывать этот скрытый input -->
    <input type="file" class="uk-button uk-button-primary" style="display: none" />
  </div>
</template>

<script>
export default {
  setup() {
    // нужна реализация именно из setup()
    const showFileChooser = () => {
      // что нужно тут написать чтобы появилось окно выбора файла?
      // возможно нужно что-то еще добавить в шаблон и т.п.
    };
    return { showFileChooser };
  },
};
</script>



