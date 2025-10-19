import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface ComicPanel {
  id: number;
  scene: string;
  image: string;
  dialogue: Array<{
    character: string;
    text: string;
    action?: string;
  }>;
}

const comicPanels: ComicPanel[] = [
  {
    id: 1,
    scene: 'Авиабаза Форт-Бакстер — Утро',
    image: 'https://cdn.poehali.dev/projects/b3560631-c2f1-45b8-9409-6de5940bd86c/files/7e94eae3-cefc-4ca8-93aa-f977054ab425.jpg',
    dialogue: [
      {
        character: 'Описание',
        text: 'На экране видна авиабаза, солнце поднимается над горизонтом. Виктор Вэнс, чернокожий и лысый, выходит из самолета, оглядываясь вокруг.',
        action: 'narration'
      },
      {
        character: 'Сержант Пеппа',
        text: 'Добро пожаловать на Форт-Бакстер, Вэнс! Готовься к службе.'
      },
      {
        character: 'Виктор',
        text: 'Спасибо, сержант. Дела у меня в порядке.'
      }
    ]
  },
  {
    id: 2,
    scene: 'Офис сержанта Джерри Мартинеса',
    image: 'https://cdn.poehali.dev/projects/b3560631-c2f1-45b8-9409-6de5940bd86c/files/243e2141-bc67-473b-8b2a-b3b1df639e23.jpg',
    dialogue: [
      {
        character: 'Описание',
        text: 'Виктор заходит в офис. Джерри, крепкий мужчина в униформе, смотрит на него с интересом.',
        action: 'narration'
      },
      {
        character: 'Джерри',
        text: 'Виктор, рад тебя видеть. У меня для тебя есть возможность… заработать. Но это не служба.'
      },
      {
        character: 'Виктор',
        text: 'Я пришёл служить, не зарабатывать на жизнь с помощью преступлений.',
        action: 'нахмуривает брови'
      },
      {
        character: 'Джерри',
        text: 'Это твое дело. Но вот, отправься в Международный аэропорт имени Эскобара и забери для меня пакет.',
        action: 'усмехается'
      }
    ]
  },
  {
    id: 3,
    scene: 'Дорога к аэропорту',
    image: 'https://cdn.poehali.dev/projects/b3560631-c2f1-45b8-9409-6de5940bd86c/files/8f328f77-9012-47b5-8782-557c6efb1320.jpg',
    dialogue: [
      {
        character: 'Описание',
        text: 'Виктор мчит на своём мотоцикле Streetfighter. Ветер развивает его одежду. На фоне звучит напряженная музыка.',
        action: 'narration'
      }
    ]
  },
  {
    id: 4,
    scene: 'Аэропорт имени Эскобара — Встреча с дилером',
    image: 'https://cdn.poehali.dev/projects/b3560631-c2f1-45b8-9409-6de5940bd86c/files/43560588-1a4f-4643-af79-fa206fc8de41.jpg',
    dialogue: [
      {
        character: 'Описание',
        text: 'Виктор встречает дилера на пирсе, обмениваются взглядами. Дилер передаёт пакет.',
        action: 'narration'
      },
      {
        character: 'Дилер',
        text: 'Будь осторожен, друг. Здесь полно недоброжелателей.'
      },
      {
        character: 'Описание',
        text: 'Внезапно, из-за угла появляются наёмники. Начинается погоня!',
        action: 'narration'
      }
    ]
  },
  {
    id: 5,
    scene: 'Вода и взрывы',
    image: 'https://cdn.poehali.dev/projects/b3560631-c2f1-45b8-9409-6de5940bd86c/files/48ce444f-2067-4965-a70b-fd2295bd1984.jpg',
    dialogue: [
      {
        character: 'Описание',
        text: 'Лодка Marquis плывёт, Виктор и дилер выглядят испуганными. Внезапно лодка взрывается!',
        action: 'narration'
      },
      {
        character: 'Описание',
        text: 'Виктор видит, как дилер погружается под воду. Виктор прыгает в воду и стремится к берегу, избегая выстрелов наёмников.',
        action: 'narration'
      }
    ]
  },
  {
    id: 6,
    scene: 'Берег',
    image: 'https://cdn.poehali.dev/projects/b3560631-c2f1-45b8-9409-6de5940bd86c/files/cf2e2f15-ab64-45a5-88bf-f1e32201bea3.jpg',
    dialogue: [
      {
        character: 'Описание',
        text: 'Виктор, выбравшись на берег, в спешке проверяет окрестности и видит, что враги следуют за ним. Он активирует пейджер и получает сообщение.',
        action: 'narration'
      }
    ]
  },
  {
    id: 7,
    scene: 'Возвращение на базу',
    image: 'https://cdn.poehali.dev/projects/b3560631-c2f1-45b8-9409-6de5940bd86c/files/e5fec21a-37a2-4881-82f0-6af19e455f73.jpg',
    dialogue: [
      {
        character: 'Описание',
        text: 'Виктор на мотоцикле снова едет к лагерю, его лицо уставшее, но решительное. Он прячет наркотики в своей казарме, следя за тем, чтобы никто их не заметил.',
        action: 'narration'
      },
      {
        character: 'Виктор',
        text: 'Это только начало…',
        action: 'шепчет про себя'
      },
      {
        character: 'Описание',
        text: 'Камера постепенно отдаляется, показывая всю базу, с налетом напряженности и тревоги.',
        action: 'narration'
      }
    ]
  }
];

export default function ComicViewer() {
  const navigate = useNavigate();
  const [currentPanel, setCurrentPanel] = useState(0);
  const [showDialogue, setShowDialogue] = useState(true);

  const nextPanel = () => {
    if (currentPanel < comicPanels.length - 1) {
      setCurrentPanel(currentPanel + 1);
      setShowDialogue(true);
    }
  };

  const prevPanel = () => {
    if (currentPanel > 0) {
      setCurrentPanel(currentPanel - 1);
      setShowDialogue(true);
    }
  };

  const panel = comicPanels[currentPanel];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name="ArrowLeft" size={20} />
            <span>Назад</span>
          </button>
          
          <Badge className="bg-primary text-primary-foreground">
            Эпизод 1: Первые шаги в тёмный мир
          </Badge>

          <button
            onClick={() => setShowDialogue(!showDialogue)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name={showDialogue ? 'EyeOff' : 'Eye'} size={20} />
            <span>{showDialogue ? 'Скрыть' : 'Показать'} диалоги</span>
          </button>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="relative animate-fade-in">
            <Card className="overflow-hidden bg-card border-4 border-border comic-shadow">
              <div className="relative">
                <img 
                  src={panel.image} 
                  alt={panel.scene}
                  className="w-full h-auto"
                />
                
                <div className="absolute top-4 left-4 right-4">
                  <div className="bg-black/80 px-4 py-2 inline-block">
                    <p className="text-secondary font-bold text-sm md:text-base uppercase">
                      Сцена {panel.id}: {panel.scene}
                    </p>
                  </div>
                </div>
              </div>

              {showDialogue && (
                <div className="p-6 space-y-4 bg-muted/50">
                  {panel.dialogue.map((line, index) => (
                    <div 
                      key={index}
                      className={`animate-fade-in ${
                        line.action === 'narration' 
                          ? 'bg-background/80 p-4 italic border-l-4 border-primary' 
                          : 'bg-card p-4 border-2 border-border'
                      }`}
                      style={{ animationDelay: `${index * 0.15}s` }}
                    >
                      {line.action !== 'narration' && (
                        <p className="font-bold text-primary mb-1">
                          {line.character}
                          {line.action && <span className="text-muted-foreground text-sm ml-2">({line.action})</span>}
                        </p>
                      )}
                      <p className={line.action === 'narration' ? 'text-muted-foreground' : ''}>
                        {line.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>

          <div className="flex items-center justify-between mt-8 gap-4">
            <Button
              onClick={prevPanel}
              disabled={currentPanel === 0}
              className="flex items-center gap-2 hover-scale"
              size="lg"
            >
              <Icon name="ChevronLeft" size={20} />
              Предыдущая
            </Button>

            <div className="flex gap-2">
              {comicPanels.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPanel(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentPanel 
                      ? 'bg-primary w-8' 
                      : 'bg-muted hover:bg-muted-foreground'
                  }`}
                  aria-label={`Перейти к сцене ${index + 1}`}
                />
              ))}
            </div>

            <Button
              onClick={nextPanel}
              disabled={currentPanel === comicPanels.length - 1}
              className="flex items-center gap-2 hover-scale"
              size="lg"
            >
              Следующая
              <Icon name="ChevronRight" size={20} />
            </Button>
          </div>

          {currentPanel === comicPanels.length - 1 && (
            <div className="text-center mt-8 animate-fade-in">
              <p className="text-2xl font-bold mb-4">Конец эпизода</p>
              <Button
                onClick={() => navigate('/')}
                className="bg-secondary text-secondary-foreground hover-scale"
                size="lg"
              >
                Вернуться к списку эпизодов
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
