import { useState } from 'react';

function App() {
    const [theme, setTheme] = useState<string>('dark');

    const handleClickSwitchTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };
    return (
        <>
            <button
                onClick={handleClickSwitchTheme}
                className={`switch-theme ${theme === 'dark' ? '--dark' : ''}`}
            >
                Сменить тему
            </button>
            <div className={`container  ${theme === 'dark' ? '--dark' : ''}`}>
                <h1>Здесь скоро будет Skypro.Music</h1>
            </div>
        </>
    );
}

export default App;
