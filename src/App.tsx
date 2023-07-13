import { Bar } from './components/bar/bar';
import { Footer } from './components/footer/footer';
import { Sidebar } from './components/sidebar/sidebar';
import { Nav } from './components/navigation/nav';
import { Songs } from './components/songs/songs';
import { Search } from './components/search/search';
import { Filter } from './components/filter/filter';

function App() {
    return (
        <div className="wrapper">
            <div className="container">
                <main className="main">
                    <Nav />
                    <div className="main__centerblock centerblock">
                        <Search />
                        <h2 className="centerblock__h2">Треки</h2>
                        <Filter />
                        <Songs />
                    </div>
                    <Sidebar />
                </main>

                <Bar />
                <Footer />
            </div>
        </div>
    );
}

export default App;
