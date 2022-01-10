const mongoose = require('mongoose')

/*
Терминология используемая в модели
observer - наблюдатель
observable - наблюдаемый, человек за которым ведеться наблюдение
controller - исполнитель соблюдения правил
*/


const observerSchema = new mongoose.Schema(
  {
    // данные которые заполняются программой автоматически
    uId: {
      // id пользователя, который создал эту запись, остальные записи не должны быть связаны с другими моделями,
      // а будут только копироваться значения, потому как они могут быть динамичными в будущем
      // а нам нужно зафиксировать значения на момент создания этой записи
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      rel: 'User'
    },
    userObserver: { // Заполняется автоматически в контроллере, вытаскиваются данные из профиля пользователя.
      type: String,
      require: true
    },
    departmentObserver: { // Заполняется автоматически в контроллере, вытаскиваются данные из профиля пользователя.
      type: String,
      require: true
    },
    departmentObserverId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true
    },

    // Общие данные, которые заполняются пользователем
    branchObserver: { // Заполняется вручную, потому как пользователи могут проводить наблюдения в разных проектах.
      type: String,
      require: true,
    },
    branchObserverId: mongoose.Schema.Types.ObjectId,
    location: { // Заполняется вручную, например на углу склада, в подвале, на кране и т.п.
      type: String
    },
    dateTime: { // Заполняется вручную, человек помечает дату и время происшествия
      type: Date
    },

    // Условный выбор – Рискованное (да или нет),
    isRisk: { // В зависимости от этой опции будут заполняться остальные поля
      type: Boolean,
      default: false
    },


    departmentObservable: String, // по умолчанию это отдел за которым ведется наблюдение
    departmentObservableId: mongoose.Schema.Types.ObjectId,
    descriptionObservable: String, // описание, будет использоваться для безопасного и опасного поведения
    // При условии если isRisk true, иначе все поля обязательны
    userObservable: String, // Наблюдаемое рискованное поведение - ответственный
    departmentController: String, // Отдел, который будет контролировать за исполнением
    departmentControllerId: mongoose.Schema.Types.ObjectId, // Отдел, который будет контролировать за исполнением
    userController: String, // Человек, который будет контролировать за исполнением
    userControllerId: mongoose.Schema.Types.ObjectId, // Человек, который будет контролировать за исполнением
    descriptionController: String, // Описание для - Предлагаемые меры безопасности (что нужно сделать, чтобы инцидент не повторялся)

    // ДЕЙСТВИЕ/КАТЕГОРИИ СОСТОЯНИЯ
    // РУЧ. ИНСТРУМЕНТЫ/ОБОРУДОВАНИИ
    equipmentIncorrectUsage: Boolean, // Неправильное использование
    equipmentIncorrectChoice: Boolean, // Неправильный выбор
    equipmentDamaged: Boolean,  // Поврежденный/неисправный
    equipmentSelfMade: Boolean, // Самодельно инструмент
    equipmentPeriodicalControl: Boolean, // Периодического контроля

    // СИЗ
    sizWithout: Boolean, // Отсутствие СИЗ
    sizNotWorking: Boolean, // Неисправных СИЗ
    sizIncorrect: Boolean, // Несоответсвующих СИЗ
    sizNonControlled: Boolean, // Неконтролируемые СИЗ

    // ВЫПОЛНЯЕМАЯ РАБОТА
    jobPlanning: Boolean, // Планирование работ
    jobInformed: Boolean, // Информирование/связь
    jobIncorrect: Boolean, // Неправильная и опасная работа
    jobMethod: Boolean, // Метод производства работ
    jobAnalyze: Boolean, // Анализ риска
    jobAccess: Boolean, // Наряд-допуск
    jobSign: Boolean, // Знаки / Ограждение
    jobLifting: Boolean,  // Грузоподъемные работы
    jobFireSecure: Boolean,  // Пожарная безопасность
    jobGasCylinders: Boolean, // Газ баллоны и их шланги
    jobScaffolding: Boolean, // Строительных лесов
    jobConfinedSpaces: Boolean, // Замкнутые пространства
    jobFireWorks: Boolean, // Огневые работы
    jobOnHeight: Boolean, // Работа на высоте
    jobExcavation: Boolean, // Земляные работы
    jobElectricalSafety: Boolean, // Электробезопасность
    jobLightning: Boolean, // Освешение

    // ПОРЯДОК НА РАБОЧЕМ МЕСТЕ
    workplaceWaste: Boolean, // Отходы
    workplaceMaterialStorage: Boolean, // Складирование материала
    workplaceStumbling: Boolean, // Спотыкание
    workplaceCombustibleMaterials: Boolean, // Горючие материалы
    workplaceSlipperySurfaces: Boolean, // Скользкие поверхности

    // ДЕЙСТВИЕ
    actionThoughtlessAct: Boolean, // Необдуманный поступок
    actionDangerZone: Boolean, // Нахождение в опасной зоне
    actionEnterExit: Boolean, // Вход / Выход
    actionFight: Boolean, // Драка / Возражение

    // УПРАВЛЕНИЕ ДВИЖЕНИЕМ
    moveControlService: Boolean, // Обслуживание
    moveControlSpeed: Boolean, // Несоблюдение огр. скорости
    moveControlDangerDrive: Boolean, // Опасное вождение
    moveControlSigns: Boolean, // Знаки и Сигналы
    moveControlSeatBealt: Boolean, // Ремня безопасности
    moveControlDangerousTransportation: Boolean, // Опасная транспортировка
    moveControlWihoutDocuments: Boolean, // Отсутствие документов
    moveControlUnauthorized: Boolean, // Несанкционированное исполь.
    moveControlMedAlco: Boolean, // Медосмотр / Алкоголь

    // ОБУЧЕНИЕ
    educationWithout: Boolean, // Не обеспечение обучения
    educationNoVisit: Boolean, // Не посещение на обучения
    educationMisunderstand: Boolean, // Непонимание обучения
    educationWithoutDocuments: Boolean, // Отсутствие удостоверении

    // ОСТАНОВЛЕНИЕ РАБОТ
    // Только если isRisk был равен true
    stopWorkDateTime_stop: Boolean, // Дата /время остановление
    stopWorkDateTime_start: Boolean, // Дата / время запуска
    photos: Array
  },
  {
    timestamps: true
  }
)



module.exports = mongoose.model("Observer", observerSchema)
