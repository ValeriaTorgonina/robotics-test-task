import { CHANGE_YEAR } from "./actions"

export const mainState = {
    years: [
        {
            year: 2001,
            title: 'Расширение возможностей',
            date: '24 августа 2001 г.',
            text: 'ВЛБАНК (ОАО) перешёл на промышленную эксплуатацию автоматизированной банковской системы ЦФТ-Банк, современного масштабируемого решения, позволившего банку перестроить свой  технологический цикл и расширить потенциальные возможности для развития.' ,
        },
        {
            year: 2002,
            title: 'Смещение границ',
            date: '24 августа 2002 г.',
            text: 'Таким образом начало повседневной работы по формированию позиции играет важную роль в формировании существенных финансовых и административных условий. Задача организации в особенности требуют определения и уточнения соответствующий условий активизации.' ,
        },
        {
            year: 2003,
            title: 'Новые горизонты',
            date: '24 августа 2003 г.',
            text: 'Идейные соображения высшего порядка, а также укрепление и развитие структуры требуют от нас анализа соответствующий условий активизации. Таким образом сложившаяся структура организации требуют определения и уточнения форм развития. ' ,
        },
        {
            year: 2004,
            title: 'Увеличение прибыли',
            date: '24 августа 2004 г.',
            text: 'Разнообразный и богатый опыт играет важную роль в формировании соответствующий условий активизации. Идейные соображения высшего порядка, а также дальнейшее развитие различных форм деятельности представляет собой интересный эксперимент проверки дальнейших направлений развития.' ,
        },
        {
            year: 2005,
            title: 'Выход на новый уровень',
            date: '24 августа 2005 г.',
            text: 'Значимость этих проблем настолько очевидна, что дальнейшее развитие различных форм деятельности представляет собой интересный эксперимент проверки модели развития' ,
        },
        {
            year: 2006,
            title: 'Перспективы расширения',
            date: '24 августа 2006 г.',
            text: 'Идейные соображения высшего порядка, а также новая модель организационной деятельности играет важную роль в формировании форм развития. Не следует, однако забывать, что укрепление и развитие структуры способствует подготовки и реализации системы обучения кадров.' ,
        },
        {
            year: 2007,
            title: 'Увеличение показателей',
            date: '24 августа 2007 г.',
            text: 'Идейные соображения высшего порядка, а также сложившаяся структура организации позволяет оценить значение форм развития. Начало повседневной работы по формированию позиции представляет собой интересный эксперимент проверки дальнейших направлений развития.' ,
        },
        {
            year: 2008,
            title: 'Итоги работы',
            date: '24 августа 2008 г.',
            text: 'С другой стороны сложившаяся структура организации позволяет выполнять важные задания по разработке форм развития. Разнообразный и богатый опыт новая модель организационной деятельности требуют от нас анализа систем массового участия.' ,
        }
    ],
    activeYear: {
        year: 2001,
        title: 'Расширение возможностей',
        date: '24 августа 2001 г.',
        text: 'ВЛБАНК (ОАО) перешёл на промышленную эксплуатацию автоматизированной банковской системы ЦФТ-Банк, современного масштабируемого решения, позволившего банку перестроить свой  технологический цикл и расширить потенциальные возможности для развития.' ,
    }
}

export const mainReducer = function(state = mainState, action) {
    switch(action.type) {
        case CHANGE_YEAR:
            const newActiveYear = state.years.find(item => item.year === action.payload);
            let newState = {...state};
            newState.activeYear = {...newActiveYear};
            return newState;

        default: 
            return state
    }
}