
import React, { useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom/client';

// All React code is contained within this file.
// React and ReactDOM are available globally from the scripts loaded in index.html

// --- CONSTANTS, DATA AND LOGIC ---

const ANNO_MUNDI_OFFSET = 4225;

const LUNA_NAMES = ["Magnética", "Lunar", "Eléctrica", "Auto-Existente", "Entonada", "Rítmica", "Resonante", "Galáctica", "Solar", "Planetaria", "Espectral", "Cristal", "Cósmica"];
const LUNA_TONES = ["Propósito", "Desafío", "Servicio", "Forma", "Resplandor", "Igualdad", "Sintonización", "Integridad", "Intención", "Manifestación", "Liberación", "Cooperación", "Presencia"];
const DAY_NAMES = ["Día 1: Voluntad", "Día 2: Manifestación", "Día 3: Revelación", "Día 4: Abundancia", "Día 5: Equilibrio", "Día 6: Finalización", "Día 7: Soberanía"];
const WEEK_DAY_SHORT = ["Vol", "Man", "Rev", "Abu", "Equ", "Fin", "Sob"];

const EXPLANATIONS = {
    'luna_0': { title: 'Tono 1: Magnético', content: 'Aquí, la Creación nos pregunta: ¿Cuál es tu propósito? Es el punto de inicio donde la Voluntad Divina y la nuestra se unifican. No se trata de un deseo personal, sino de atraer la idea sagrada que Dios quiere manifestar a través de nosotros en este ciclo. Es un acto de magnetismo espiritual, alineándonos con la Verdad para ser un canal puro de la Creación.' },
    'luna_1': { title: 'Tono 2: Lunar', content: 'La Creación revela la dualidad. Todo lo que existe tiene su opuesto para poder ser comprendido. Este tono nos presenta el desafío no como un obstáculo, sino como la sagrada polaridad que da estabilidad a nuestro propósito. Es el suelo fértil donde la semilla de la intención puede anclar, reconociendo la sombra para poder anclar la luz. Es la Verdad del equilibrio.' },
    'luna_2': { title: 'Tono 3: Eléctrico', content: 'Esta es la chispa de la vida, el aliento divino que pone la Creación en movimiento. El servicio es la expresión del Amor de Dios en acción. El propósito y el desafío se entrelazan y se activan, comenzando a tejer la realidad. Somos llamados a ser el vínculo, el puente por donde fluye la energía sagrada que da vida a la Verdad.' },
    'luna_3': { title: 'Tono 4: Auto-Existente', content: 'Dios es un Dios de Orden. La Creación no es caótica, sino que sigue una geometría sagrada. Este tono nos enseña a dar forma y estructura a nuestra acción, a crear el \'vaso\' que contendrá la luz. Definir la forma es un acto de reverencia, asegurando que nuestra manifestación sea un reflejo del orden divino y la Verdad.' },
    'luna_4': { title: 'Tono 5: Entonado', content: 'Como hijos de la Creación, estamos dotados de poder y autoridad espiritual. Este tono nos llama a reunir nuestra fuerza interna, no desde el ego, sino desde la certeza de que somos un reflejo de Dios. Es el momento de comandar los recursos y la energía con la confianza que emana de la Verdad, permitiendo que nuestro ser irradie la luz del propósito.' },
    'luna_5': { title: 'Tono 6: Rítmico', content: 'El Universo danza a un ritmo sagrado. Este tono nos invita a encontrar ese pulso divino en nuestras acciones. Se trata de organizar la Creación con igualdad y equilibrio, asegurando un flujo armónico. La Verdad de este tono es que la justicia y el balance son esenciales para que la manifestación sea sostenible y orgánica, reflejando la propia naturaleza del Creador.' },
    'luna_6': { title: 'Tono 7: Resonante', content: 'En el centro del ciclo, la Creación nos llama al silencio y a la escucha. Es un acto de sintonización con la fuente, una canalización directa de la sabiduría divina. Aquí nos inspiramos y nos alineamos, asegurando que nuestra obra no sea solo nuestra, sino un eco de la canción universal de Dios. Es la Verdad que se recibe en la quietud del corazón.' },
    'luna_7': { title: 'Tono 8: Galáctico', content: 'La fe sin obras es fe muerta. Este tono exige integridad, la armonía perfecta entre lo que creemos y lo que hacemos. Es el momento de modelar nuestra vida según la Verdad que hemos recibido, de ser un testimonio viviente de la Ley Divina. Es la Creación pidiéndonos ser coherentes, para que la forma y el espíritu sean uno.' },
    'luna_8': { title: 'Tono 9: Solar', content: 'La intención, cuando está alineada con la Voluntad Divina, tiene un poder inmenso. Este tono es el pulso de la manifestación, la realización deliberada del propósito. Es el momento de actuar con una intención enfocada y pura, sabiendo que estamos dirigiendo la energía de la Creación de Dios hacia un fin sagrado. La Verdad se hace tangible a través de nuestra intención.' },
    'luna_9': { title: 'Tono 10: Planetario', content: 'Así como Dios perfeccionó Su Creación, nosotros somos llamados a perfeccionar la nuestra. Este tono es sobre la manifestación visible, el pulido final de nuestra obra hasta que refleje la belleza y la excelencia del plan divino. Es el amor por el detalle, el cuidado que honra al Creador y produce una Verdad que puede ser vista y tocada por todos.' },
    'luna_10': { title: 'Tono 11: Espectral', content: 'Para que lo nuevo pueda nacer, lo viejo debe disolverse. Este tono es una limpieza espiritual, una liberación de todo lo que no sirve al propósito divino. Es un acto de humildad y rendición, soltando el control y permitiendo que la energía estancada se transforme. La Verdad nos libera de las ataduras del ego para que la Creación pueda fluir sin impedimentos.' },
    'luna_11': { title: 'Tono 12: Cristal', content: 'Ninguna Creación es para uno mismo. Este tono nos recuerda la unidad de todo lo que vive. Es el momento de cooperar, de compartir nuestra manifestación con la comunidad y dedicarla a un bien mayor. Nuestra obra se universaliza, convirtiéndose en parte del tejido colectivo de la Verdad, un regalo de vuelta al mundo que es un reflejo del regalo de la vida de Dios.' },
    'luna_12': { title: 'Tono 13: Cósmico', content: 'Al final del ciclo, trascendemos la experiencia para perdurar en la Presencia de Dios. Es un estado de gratitud y celebración por haber sido un canal de la Creación. La alegría y el amor se expanden, integrando la lección aprendida. Es la Verdad de que cada final es un nuevo comienzo, y que el acto de co-crear con Dios es eterno.' },
    'annoMundi': { title: 'Anno Mundi (A.M.)', content: 'Significa "Año del Mundo", y representa una alineación consciente con el Tiempo Divino, no con el tiempo del hombre. Al comenzar en el equinoccio de primavera, honramos los ciclos sagrados de la Creación de Dios. Es un acto de reconocimiento de que el tiempo verdadero fluye de acuerdo a los ritmos del cosmos y la naturaleza, y no de calendarios arbitrarios. Es vivir en la Verdad del tiempo natural.' },
    'diaDeLaSemana_0': { title: 'Día de la Voluntad', content: 'Este día es para alinear nuestra voluntad con la Voluntad Suprema del Creador. No es imponer nuestro deseo, sino preguntar: "Padre, ¿cuál es Tu Voluntad para mí hoy?". Es el fundamento de toda co-creación, la intención pura que nace de la conexión con la Verdad Divina.' },
    'diaDeLaSemana_1': { title: 'Día de la Manifestación', content: 'La Voluntad Divina busca un cuerpo, una forma en este mundo. Este día nos llama a ser las manos del Creador, dando los primeros pasos prácticos para materializar la intención sagrada. Es el momento de la planificación y la organización, construyendo un recipiente digno para la luz.' },
    'diaDeLaSemana_2': { title: 'Día de la Revelación', content: 'Aquí, el Espíritu Santo entra en la forma y la activa. La energía de la Creación se pone en movimiento, revelando tanto los caminos a seguir como las pruebas a superar. Es un día de acción dinámica, donde la Verdad se revela a través del movimiento y la superación de la inercia.' },
    'diaDeLaSemana_3': { title: 'Día de la Abundancia', content: 'La verdadera abundancia proviene del orden divino. Este día es para estructurar nuestra creación según la Ley Sagrada. Al definir y medir nuestro progreso con sabiduría, creamos un flujo ordenado que permite que la gracia y los recursos de Dios se manifiesten plenamente.' },
    'diaDeLaSemana_4': { title: 'Día del Equilibrio', content: 'Como co-creadores, debemos estar centrados en nuestro poder espiritual. Este día nos empodera, reuniendo los recursos internos y externos para guiar la creación con autoridad y confianza. El equilibrio se encuentra al actuar desde la certeza de que somos instrumentos de un Poder Superior.' },
    'diaDeLaSemana_5': { title: 'Día de la Finalización', content: 'Este día busca la armonía y el ritmo perfecto en el flujo de la Creación. No se trata de un final, sino de llevar la obra a un estado de integridad orgánica. Es un día para ajustar y equilibrar, asegurando que cada parte de nuestra creación dance en sintonía con el todo, reflejando la paz de Dios.' },
    'diaDeLaSemana_6': { title: 'Día de la Soberanía', content: 'En este último día, reclamamos nuestra herencia divina como hijos soberanos del Creador. Es un día de sintonización final, elevando nuestra creación a su máxima vibración espiritual. Celebramos la armonía lograda y reconocemos que la verdadera soberanía reside en servir a la Voluntad Divina.' },
    'diaFueraDelTiempo': { title: 'Día Fuera del Tiempo', content: 'Este no es un día común, es una pausa sagrada en el tejido del tiempo. Es un regalo de la Creación, un momento para existir en el eterno \'ahora\' de Dios. Libre de ciclos y tareas, es un día para el perdón que libera el pasado, el arte que celebra la belleza divina y la gratitud que prepara el alma para el nuevo año. Es la Verdad de la Gracia pura.' }
};

const getAdjustedDateForCreatorCalendar = (currentDate) => {
    const adjustedDate = new Date(currentDate);
    adjustedDate.setHours(adjustedDate.getHours() - 18);
    return adjustedDate;
};

const calculateCreatorDate = (gregorianDate) => {
    const today = new Date(gregorianDate.getFullYear(), gregorianDate.getMonth(), gregorianDate.getDate());
    const gregorianYear = today.getFullYear();
    const springEquinoxCurrentYear = new Date(gregorianYear, 2, 20);
    let yearStart = (today < springEquinoxCurrentYear) ? new Date(gregorianYear - 1, 2, 20) : new Date(gregorianYear, 2, 20);
    const annoMundiYear = yearStart.getFullYear() + ANNO_MUNDI_OFFSET;
    const diffTime = today.getTime() - yearStart.getTime();
    const daysPassed = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (daysPassed >= 364) {
        return { annoMundiYear, isDayOutOfTime: true, lunaName: "Día Fuera del Tiempo", lunaTone: "Meditación y Gracia" };
    }

    const lunaIndex = Math.floor(daysPassed / 28);
    const dayOfLuna = (daysPassed % 28) + 1;
    const dayOfWeekIndex = daysPassed % 7;
    const lunaStartDate = new Date(yearStart.getTime() + lunaIndex * 28 * 24 * 60 * 60 * 1000);
    const flatDaysInLuna = Array.from({ length: 28 }, (_, i) => ({ day: i + 1 }));
    const weeksInLuna = [];
    for (let i = 0; i < flatDaysInLuna.length; i += 7) weeksInLuna.push(flatDaysInLuna.slice(i, i + 7));
    
    return { annoMundiYear, isDayOutOfTime: false, lunaIndex, lunaName: LUNA_NAMES[lunaIndex], lunaTone: LUNA_TONES[lunaIndex], dayOfLuna, dayOfWeekIndex, dayName: DAY_NAMES[dayOfWeekIndex], daysInLuna: weeksInLuna };
};

const formatGregorianDate = (date) => new Intl.DateTimeFormat('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(date);

// --- UI COMPONENTS ---

const Loader = () => (
  <div className="flex flex-col items-center justify-center h-full text-center p-8">
    <svg className="animate-spin h-12 w-12 text-[#5a3a22]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <p className="mt-4 text-lg">Sincronizando con el Cosmos...</p>
  </div>
);

const InfoModal = ({ content, onClose }) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm modal-enter-active" onClick={onClose}>
            <div className="relative p-6 bg-[#fbf0d9] border-2 border-[#d2b48c] rounded-lg shadow-2xl max-w-md w-full text-center" onClick={(e) => e.stopPropagation()}>
                <h3 className="font-title text-2xl text-[#5a3a22] mb-3">{content.title}</h3>
                <p className="text-md text-[#5a3a22] leading-relaxed text-justify">{content.content}</p>
                <button onClick={onClose} className="mt-5 bg-[#5a3a22] text-[#fdf6e3] font-title py-2 px-6 rounded-md shadow-md hover:bg-[#6a4a32] transition-colors">
                    Entendido
                </button>
            </div>
        </div>
    );
};

// Fix: Use React.FC to properly type the functional component. This explicitly tells
// TypeScript that this is a React component, which correctly handles reserved props like `key`.
const CalendarDay: React.FC<{ day: number; isToday: boolean; }> = ({ day, isToday }) => {
    const baseClasses = "w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full text-lg transition-all duration-300";
    const todayClasses = "bg-[#6a4a32] text-[#fdf6e3] shadow-md scale-110";
    const normalClasses = "border border-[#d2b48c] hover:bg-[#eaddc7]";
    return <div className={`${baseClasses} ${isToday ? todayClasses : normalClasses}`}>{day}</div>;
};

const CalendarGrid = ({ todayInfo }) => (
    <div className="p-2">
        <div className="grid grid-cols-7 gap-1 mb-2 text-center text-sm font-bold font-title">
            {WEEK_DAY_SHORT.map(day => <div key={day}>{day}</div>)}
        </div>
        {todayInfo.daysInLuna.map((week, weekIndex) => (
            <React.Fragment key={weekIndex}>
                <hr className="my-2 border-t border-dashed border-[#d2b48c]/60" />
                <div className="grid grid-cols-7 gap-2">
                    {week.map(({ day }) => (
                        <CalendarDay key={day} day={day} isToday={day === todayInfo.dayOfLuna} />
                    ))}
                </div>
            </React.Fragment>
        ))}
    </div>
);

const DayOutOfTimeView = ({ todayInfo, gregorianDate, onSectionClick }) => (
    <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-[#8a6a52] rounded-lg bg-[#fbf0d9] my-4 text-center">
        <div className="cursor-pointer" onClick={() => onSectionClick('diaFueraDelTiempo')}>
            <h2 className="font-title text-3xl text-[#5a3a22] mb-2">{todayInfo.lunaName}</h2>
            <p className="text-xl mb-4">{todayInfo.lunaTone}</p>
            <p className="text-md">
                Este es un día sagrado para el perdón, la meditación y la preparación para el nuevo ciclo. No pertenece a ninguna luna ni a ninguna semana. Es un día de pura Gracia.
            </p>
        </div>
        <div className="cursor-pointer mt-4" onClick={() => onSectionClick('annoMundi')}>
            <p className="font-bold text-lg">Año {todayInfo.annoMundiYear} A.M.</p>
        </div>
        <p className="text-sm text-[#8a6a52] capitalize mt-1">{formatGregorianDate(gregorianDate)}</p>
    </div>
);

const CalendarView = ({ todayInfo, gregorianDate, onSectionClick }) => {
    if (!todayInfo || !gregorianDate) return <Loader />;
    
    return (
        <div className="p-4 md:p-6 bg-[#fdf6e3]/70 backdrop-blur-sm border-2 border-[#d2b48c] rounded-lg shadow-2xl shadow-black/20" style={{boxShadow: '5px 5px 15px rgba(90, 58, 34, 0.4)'}}>
            <header className="text-center mb-4">
                <h1 className="font-title text-4xl md:text-5xl text-[#5a3a22] drop-shadow-sm">Calendario Divino</h1>
            </header>
            
            {todayInfo.isDayOutOfTime ? (
               <DayOutOfTimeView todayInfo={todayInfo} gregorianDate={gregorianDate} onSectionClick={onSectionClick} />
            ) : (
              <>
                <section className="text-center mb-3 p-3 bg-[#fbf0d9] rounded-md border border-[#d2b48c] cursor-pointer transition hover:bg-[#eaddc7]" onClick={() => onSectionClick(`luna_${todayInfo.lunaIndex}`)}>
                    <h2 className="font-title text-2xl md:text-3xl text-[#5a3a22]">
                        Luna {todayInfo.lunaIndex + 1}: {todayInfo.lunaName}
                    </h2>
                    <p className="text-lg text-[#6a4a32]">Tono: {todayInfo.lunaTone}</p>
                </section>
                
                <section className="text-center mb-3 p-3 bg-[#fbf0d9] rounded-md border border-[#d2b48c] cursor-pointer transition hover:bg-[#eaddc7]" onClick={() => onSectionClick('annoMundi')}>
                    <p className="font-bold text-xl">Año {todayInfo.annoMundiYear} A.M.</p>
                    <p className="text-sm text-[#8a6a52] capitalize">{formatGregorianDate(gregorianDate)}</p>
                </section>

                <section className="text-center mb-4 p-3 bg-[#fbf0d9] rounded-md border border-[#d2b48c] cursor-pointer transition hover:bg-[#eaddc7]" onClick={() => onSectionClick(`diaDeLaSemana_${todayInfo.dayOfWeekIndex}`)}>
                   <h3 className="text-xl font-bold">{todayInfo.dayName}</h3>
                   <p className="text-2xl">Día {todayInfo.dayOfLuna} de 28</p>
                </section>
                
                <main>
                    <CalendarGrid todayInfo={todayInfo} />
                </main>
              </>
            )}
        </div>
    );
};

const InstallPWAButton = ({ onInstall }) => (
    <div className="fixed bottom-4 right-4 z-50">
        <button
            onClick={onInstall}
            className="flex items-center gap-2 bg-[#5a3a22] text-[#fdf6e3] font-title py-2 px-4 rounded-lg shadow-lg hover:bg-[#6a4a32] transition-transform transform hover:scale-105 animate-pulse"
            aria-label="Instalar la aplicación"
            title="Instalar la aplicación en tu dispositivo"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Instalar App
        </button>
    </div>
);

// --- MAIN APP COMPONENT ---

const App = () => {
    const [todayInfo, setTodayInfo] = useState(null);
    const [gregorianDate, setGregorianDate] = useState(null);
    const [installPromptEvent, setInstallPromptEvent] = useState(null);
    const [modalContentKey, setModalContentKey] = useState(null);

    useEffect(() => {
        const now = new Date();
        setGregorianDate(now);
        const adjustedDate = getAdjustedDateForCreatorCalendar(now); 
        setTodayInfo(calculateCreatorDate(adjustedDate));

        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setInstallPromptEvent(e);
        };
        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    }, []);
    
    const handleInstallClick = async () => {
        if (!installPromptEvent) return;
        installPromptEvent.prompt();
        await installPromptEvent.userChoice;
        setInstallPromptEvent(null);
    };

    const handleSectionClick = (key) => {
        if (EXPLANATIONS[key]) {
            setModalContentKey(key);
        }
    };

    const closeModal = () => {
        setModalContentKey(null);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-sm md:max-w-md">
                <CalendarView todayInfo={todayInfo} gregorianDate={gregorianDate} onSectionClick={handleSectionClick} />
            </div>
            {installPromptEvent && <InstallPWAButton onInstall={handleInstallClick} />}
            {modalContentKey && <InfoModal content={EXPLANATIONS[modalContentKey]} onClose={closeModal} />}
        </div>
    );
};

// --- RENDER THE APP ---

const rootElement = document.getElementById("root");
if(rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App />);
}
