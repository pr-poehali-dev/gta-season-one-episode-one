import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const episodes = [
  {
    id: 1,
    title: 'Первые шаги в тёмный мир',
    duration: '22 мин',
    description: 'Виктор Вэнс прибывает на авиабазу Форт-Бакстер. Сержант Мартинес предлагает ему первое опасное задание.',
    image: 'https://cdn.poehali.dev/projects/b3560631-c2f1-45b8-9409-6de5940bd86c/files/86dbc5ae-8f9b-4a70-917a-3dc688695b1f.jpg',
    hasComic: true,
    comicUrl: '/comic'
  },
  {
    id: 2,
    title: 'Сложные решения',
    duration: '24 мин',
    description: 'Виктор получает новое задание от Джерри Мартинеса — забрать деньги у Фила Кэссиди. Всё идёт не по плану.',
    image: 'https://cdn.poehali.dev/projects/b3560631-c2f1-45b8-9409-6de5940bd86c/files/441c0744-acab-49d5-b3df-e2fa75eb672f.jpg',
    hasComic: true,
    comicUrl: '/comic/2'
  },
  {
    id: 3,
    title: 'Новая жизнь',
    duration: '26 мин',
    description: 'Задание Джерри переворачивает жизнь Виктора. Его увольняют с базы, и теперь он — обычный гражданин.',
    image: 'https://cdn.poehali.dev/projects/b3560631-c2f1-45b8-9409-6de5940bd86c/files/9ddc439d-cf24-445e-8f37-8c180a25223b.jpg',
    hasComic: true,
    comicUrl: '/comic/3'
  }
];

const characters = [
  {
    id: 1,
    name: 'Виктор Вэнс',
    role: 'Главный герой',
    description: 'Солдат армии США, лысый чернокожий мужчина. Пытается честно служить, но обстоятельства втягивают его в криминальный мир.',
    image: 'https://cdn.poehali.dev/projects/b3560631-c2f1-45b8-9409-6de5940bd86c/files/e62defc6-2110-49d2-b312-f4d8382fb528.jpg'
  },
  {
    id: 2,
    name: 'Сержант Джерри Мартинес',
    role: 'Антагонист',
    description: 'Коррумпированный военный сержант. Втягивает Виктора в опасные дела с наркотиками.',
    image: 'https://cdn.poehali.dev/projects/b3560631-c2f1-45b8-9409-6de5940bd86c/files/e4c944fc-2c50-416a-82e2-7fe45a34504d.jpg'
  },
  {
    id: 3,
    name: 'Фил Кэссиди',
    role: 'Торговец оружием',
    description: 'Ветеран войны с бородой, опытный торговец оружием. Грубый и циничный, но надёжный партнёр в опасных делах.',
    image: 'https://cdn.poehali.dev/projects/b3560631-c2f1-45b8-9409-6de5940bd86c/files/bf98bcd0-c54f-49f0-a410-17e7873ce051.jpg'
  }
];

export default function Index() {
  const [activeSection, setActiveSection] = useState<'episodes' | 'characters'>('episodes');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div 
        className="relative h-[60vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `linear-gradient(rgba(26, 31, 44, 0.7), rgba(26, 31, 44, 0.9)), url('https://cdn.poehali.dev/projects/b3560631-c2f1-45b8-9409-6de5940bd86c/files/86dbc5ae-8f9b-4a70-917a-3dc688695b1f.jpg')` }}
      >
        <div className="text-center z-10 px-4 animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 text-primary drop-shadow-lg">GTA</h1>
          <p className="text-xl md:text-2xl text-secondary font-semibold">Анимационный сериал</p>
          <p className="text-muted-foreground mt-2">Сезон 1</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex gap-4 mb-8 justify-center">
          <button
            onClick={() => setActiveSection('episodes')}
            className={`px-6 py-3 font-bold text-lg transition-all hover-scale ${
              activeSection === 'episodes'
                ? 'bg-primary text-primary-foreground comic-shadow'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            <Icon name="Film" className="inline-block mr-2" size={20} />
            Эпизоды
          </button>
          <button
            onClick={() => setActiveSection('characters')}
            className={`px-6 py-3 font-bold text-lg transition-all hover-scale ${
              activeSection === 'characters'
                ? 'bg-secondary text-secondary-foreground comic-shadow'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            <Icon name="Users" className="inline-block mr-2" size={20} />
            Персонажи
          </button>
        </div>

        {activeSection === 'episodes' && (
          <div className="animate-fade-in">
            <h2 className="text-4xl font-bold mb-8 text-center">Эпизоды</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {episodes.map((episode) => (
                <Card 
                  key={episode.id} 
                  className="overflow-hidden bg-card border-2 border-border group"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={episode.image} 
                      alt={episode.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                      Эпизод {episode.id}
                    </Badge>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">{episode.title}</h3>
                    <div className="flex items-center gap-2 mb-3 text-muted-foreground">
                      <Icon name="Clock" size={16} />
                      <span>{episode.duration}</span>
                    </div>
                    <p className="text-muted-foreground mb-4">{episode.description}</p>
                    
                    <div className="flex gap-2">
                      {episode.hasComic && (
                        <button
                          onClick={() => navigate(episode.comicUrl || '/comic')}
                          className="flex-1 bg-primary text-primary-foreground px-4 py-2 font-bold hover-scale flex items-center justify-center gap-2"
                        >
                          <Icon name="BookOpen" size={18} />
                          Читать комикс
                        </button>
                      )}
                      <button
                        onClick={() => navigate(`/episode?id=${episode.id}`)}
                        className="flex-1 bg-secondary text-secondary-foreground px-4 py-2 font-bold hover-scale flex items-center justify-center gap-2"
                      >
                        <Icon name="Play" size={18} />
                        Смотреть
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'characters' && (
          <div className="animate-fade-in">
            <h2 className="text-4xl font-bold mb-8 text-center">Персонажи</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {characters.map((character) => (
                <Card 
                  key={character.id} 
                  className="overflow-hidden bg-card border-2 border-border hover-scale cursor-pointer group"
                >
                  <div className="relative h-80 overflow-hidden">
                    <img 
                      src={character.image} 
                      alt={character.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent p-6">
                      <h3 className="text-3xl font-bold mb-1">{character.name}</h3>
                      <Badge className="bg-secondary text-secondary-foreground">
                        {character.role}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-muted-foreground">{character.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer className="border-t border-border mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>GTA: Анимационный сериал — Сезон 1</p>
        </div>
      </footer>
    </div>
  );
}