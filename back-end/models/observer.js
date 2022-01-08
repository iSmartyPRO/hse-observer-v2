const mongoose = require('mongoose')

/*
Терминология используемая в модели
observer - наблюдатель
observable - наблюдаемый, человек за которым ведеться наблюдение
controller - исполнитель соблюдения правил
*/


const observerSchema = new mongoose.Schema(
  {
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
    branchObserver: { // Заполняется вручную, потому как пользователи могут проводить наблюдения в разных проектах.
      type: String,
      require: true,
    },
    location: { // Заполняется вручную, например на углу склада, в подвале, на кране и т.п.
      type: String,
      require: true
    },
    dateTime: { // Заполняется вручную, человек помечает дату и время происшествия
      type: Date,
      require: true
    },

    isRisk: { // В зависимости от этой опции будут заполняться остальные поля
      type: Boolean,
      require: true,
      default: false
    },
    departmentObservable: { // по умолчанию это отдел за которым ведется наблюдение
      type: String,
      require: true
    },
    description: String, // описание, будет использоваться для безопасного и опасного поведения

    // При условии если isRisk true, иначе все поля обязательны
    userObservable: String, // Наблюдаемое рискованное поведение - ответственный

    departmentController: String, // Отдел, который будет контролировать за исполнением
    userController: String, // Человек, который будет контролировать за исполнением
    descriptionController: String, // Описание для - Предлагаемые меры безопасности (что нужно сделать, чтобы инцидент не повторялся)

    // ДЕЙСТВИЕ/КАТЕГОРИИ СОСТОЯНИЯ
    // РУЧ. ИНСТРУМЕНТЫ/ОБОРУДОВАНИИ
    equipmentIncorrectUsage: { // Неправильное использование
      type: Boolean,
      required: true,
      default: false
    },
    equipmentIncorrectChoice: { // Неправильный выбор
      type: Boolean,
      required: true,
      default: false
    },
    equipmentDamaged: { // Поврежденный/неисправный
      type: Boolean,
      required: true,
      default: false
    },
    equipmentSelfMade: { // Самодельно инструмент
      type: Boolean,
      required: true,
      default: false
    },
    equipmentPeriodicalControl: { // Периодического контроля
      type: Boolean,
      required: true,
      default: false
    },

    // СИЗ
    sizWithout: { // Отсутствие СИЗ
      type: Boolean,
      required: true,
      default: false
    },
    sizNotWorking: { // Неисправных СИЗ
      type: Boolean,
      required: true,
      default: false
    },
    sizIncorrect: { // Несоответсвующих СИЗ
      type: Boolean,
      required: true,
      default: false
    },
    sizNonControlled: { // Неконтролируемые СИЗ
      type: Boolean,
      required: true,
      default: false
    },

    // ВЫПОЛНЯЕМАЯ РАБОТА
    jobPlanning: { // Планирование работ
      type: Boolean,
      required: true,
      default: false
    },
    jobInformed: { // Информирование/связь
      type: Boolean,
      required: true,
      default: false
    },
    jobIncorrect: { // Неправильная и опасная работа
      type: Boolean,
      required: true,
      default: false
    },
    jobMethod: { // Метод производства работ
      type: Boolean,
      required: true,
      default: false
    },
    jobAnalyze: { // Анализ риска
      type: Boolean,
      required: true,
      default: false
    },
    jobAccess: { // Наряд-допуск
      type: Boolean,
      required: true,
      default: false
    },
    jobSign: { // Знаки / Ограждение
      type: Boolean,
      required: true,
      default: false
    },
    jobLifting: { // Грузоподъемные работы
      type: Boolean
    },
    jobFireSecure: { // Пожарная безопасность
      type: Boolean,
      required: true,
      default: false
    },
    jobGasCylinders: { // Газ баллоны и их шланги
      type: Boolean,
      required: true,
      default: false
    },
    jobScaffolding: { // Строительных лесов
      type: Boolean,
      required: true,
      default: false
    },
    jobConfinedSpaces: { // Замкнутые пространства
      type: Boolean,
      required: true,
      default: false
    },
    jobFireWorks: { // Огневые работы
      type: Boolean,
      required: true,
      default: false
    },
    jobOnHeight: { // Работа на высоте
      type: Boolean,
      required: true,
      default: false
    },
    jobExcavation: { // Земляные работы
      type: Boolean,
      required: true,
      default: false
    },
    jobElectricalSafety: { // Электробезопасность
      type: Boolean,
      required: true,
      default: false
    },
    jobLightning: { // Освешение
      type: Boolean,
      required: true,
      default: false
    },

    // ПОРЯДОК НА РАБОЧЕМ МЕСТЕ
    workplaceWaste: { // Отходы
      type: Boolean,
      required: true,
      default: false
    },
    workplaceMaterialStorage: { // Складирование материала
      type: Boolean,
      required: true,
      default: false
    },
    workplaceStumbling: { // Спотыкание
      type: Boolean,
      required: true,
      default: false
    },
    workplaceCombustibleMaterials: { // Горючие материалы
      type: Boolean,
      required: true,
      default: false
    },
    workplaceSlipperySurfaces: { // Скользкие поверхности
      type: Boolean,
      required: true,
      default: false
    },

    // ДЕЙСТВИЕ
    actionThoughtlessAct: { // Необдуманный поступок
      type: Boolean,
      required: true,
      default: false
    },
    actionDangerZone: { // Нахождение в опасной зоне
      type: Boolean,
      required: true,
      default: false
    },
    actionEnterExit: { // Вход / Выход
      type: Boolean,
      required: true,
      default: false
    },
    actionFight: { // Драка / Возражение
      type: Boolean,
      required: true,
      default: false
    },

    // УПРАВЛЕНИЕ ДВИЖЕНИЕМ
    moveControlService: { // Обслуживание
      type: Boolean,
      required: true,
      default: false
    },
    moveControlSpeed: { // Несоблюдение огр. скорости
      type: Boolean,
      required: true,
      default: false
    },
    moveControlDangerDrive: { // Опасное вождение
      type: Boolean,
      required: true,
      default: false
    },
    moveControlSigns: { // Знаки и Сигналы
      type: Boolean,
      required: true,
      default: false
    },
    moveControlSeatBealt: { // Ремня безопасности
      type: Boolean,
      required: true,
      default: false
    },
    moveControlDangerousTransportation: { // Опасная транспортировка
      type: Boolean,
      required: true,
      default: false
    },
    moveControlWihoutDocuments: { // Отсутствие документов
      type: Boolean,
      required: true,
      default: false
    },
    moveControlUnauthorized: { // Несанкционированное исполь.
      type: Boolean,
      required: true,
      default: false
    },
    moveControlMedAlco: { // Медосмотр / Алкоголь
      type: Boolean,
      required: true,
      default: false
    },

    // ОБУЧЕНИЕ
    educationWithout: { // Не обеспечение обучения
      type: Boolean,
      required: true,
      default: false
    },
    educationNoVisit: { // Не посещение на обучения
      type: Boolean,
      required: true,
      default: false
    },
    educationMisunderstand: { // Непонимание обучения
      type: Boolean,
      required: true,
      default: false
    },
    educationWithoutDocuments: { // Отсутствие удостоверении
      type: Boolean,
      required: true,
      default: false
    },

    // ОСТАНОВЛЕНИЕ РАБОТ
    // Только если isRisk был равен true
    stopWorkDateTime_stop: { // Дата /время остановление
      type: Boolean
    },
    stopWorkDateTime_start: { // Дата / время запуска
      type: Boolean
    },
    photos: {
      type: Array
    }
  },
  {
    timestamps: true
  }
)



module.exports = mongoose.model("Observer", observerSchema)
