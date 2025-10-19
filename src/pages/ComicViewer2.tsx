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
    scene: 'Офис сержанта Джерри Мартинеса — Утро',
    image: 'https://cdn.poehali.dev/projects/b3560631-c2f1-45b8-9409-6de5940bd86c/files/441c0744-acab-49d5-b3df-e2fa75eb672f.jpg',
    dialogue: [
      {
        character: 'Описание',
        text: 'Виктор Вэнс сидит за столом, видно, как он нервничает. Джерри Мартинес, уверенный в себе сержант, беседует с ним.',
        action: 'narration'
      },
      {
        character: 'Виктор',
        text: 'Сержант, я не знаю... У меня есть моральные проблемы с этим. Я не собираюсь заниматься наркотиками.'
      },
      {
        character: 'Джерри',
        text: 'Слушай, Виктор. Это новый мир, и в нём все задействованы в чем-то. Но как насчёт оружия? У тебя есть с этим какие-то проблемы?',
        action: 'успокаивающе'
      },
      {
        character: 'Виктор',
        text: 'Нет, с оружием всё проще...'
      },
      {
        character: 'Джерри',
        text: 'Отлично. У нас есть возможность заработать. Забери деньги у Фила Кэссиди за перепродажу оружия. Это твой шанс.'
      },
      {
        character: 'Виктор',
        text: 'Ладно, я сделаю это.',
        action: 'всё ещё нервничая, кивает'
      }
    ]
  },
  {
    id: 2,
    scene: 'Склад Фила Кэссиди в Вайс-Порту',
    image: 'https://cdn.poehali.dev/projects/b3560631-c2f1-45b8-9409-6de5940bd86c/files/da09191b-63ca-4e1e-b323-eb89e36e3ccc.jpg',
    dialogue: [
      {
        character: 'Описание',
        text: 'Виктор подъезжает к складу на своём мотоцикле. Он заходит внутрь и находит Фила.',
        action: 'narration'
      },
      {
        character: 'Виктор',
        text: 'Фил, дай деньги Мартинесу.'
      },
      {
        character: 'Фил',
        text: 'У меня нет денег, Виктор. Но я знаю, где они. Поехали.',
        action: 'вздыхая'
      },
      {
        character: 'Описание',
        text: 'Фил ведёт Виктора к старому жилищу, где хранятся деньги.',
        action: 'narration'
      }
    ]
  },
  {
    id: 3,
    scene: 'Старый дом Фила — Улица',
    image: 'https://cdn.poehali.dev/projects/b3560631-c2f1-45b8-9409-6de5940bd86c/files/72a8afa1-8e52-48df-9aff-d85e25c4075e.jpg',
    dialogue: [
      {
        character: 'Описание',
        text: 'На улице два автомобиля Cholo Sabre. Бандиты Чолос стоят у дома, обсуждая что-то.',
        action: 'narration'
      },
      {
        character: 'Фил',
        text: 'Это мой дом, Бэйшор-авеню, 101. Они выселили меня, и теперь всё под контролем этой уличной банды.'
      },
      {
        character: 'Виктор',
        text: 'Я заберу деньги сам.',
        action: 'с решимостью'
      },
      {
        character: 'Описание',
        text: 'Фил кивает, испуганный тем, что собирается произойти.',
        action: 'narration'
      }
    ]
  },
  {
    id: 4,
    scene: 'Вокруг старого дома — Экшн',
    image: 'https://cdn.poehali.dev/projects/b3560631-c2f1-45b8-9409-6de5940bd86c/files/1551637f-0ca1-4a70-967b-1f85b3893ea7.jpg',
    dialogue: [
      {
        character: 'Описание',
        text: 'Виктор, решив, что подойти незамеченным не получится, достаёт оружие и начинает атаковать членов банды Чолос.',
        action: 'narration'
      },
      {
        character: 'Описание',
        text: 'Бойня начинается. Виктор стреляет, убивая бандитов перед входом в дом. Он заходит внутрь, и звуки выстрелов стихают.',
        action: 'narration'
      }
    ]
  },
  {
    id: 5,
    scene: 'Внутри дома — Финальная схватка',
    image: 'https://cdn.poehali.dev/projects/b3560631-c2f1-45b8-9409-6de5940bd86c/files/de8e6f39-58fd-43a6-88bd-e38601085ea2.jpg',
    dialogue: [
      {
        character: 'Описание',
        text: 'Внутри дома Виктор сталкивается с двумя оставшимися бандитами. Он ловко обходит их и нейтрализует их одного за другим.',
        action: 'narration'
      },
      {
        character: 'Описание',
        text: 'Виктор находит деньги, спрятанные под половиком, и, удовлетворённый, собирает их.',
        action: 'narration'
      }
    ]
  },
  {
    id: 6,
    scene: 'Возвращение на авиабазу Форт-Бакстер',
    image: 'https://cdn.poehali.dev/projects/b3560631-c2f1-45b8-9409-6de5940bd86c/files/030d4c7c-6dfc-48af-a5fc-e57de9e03561.jpg',
    dialogue: [
      {
        character: 'Описание',
        text: 'Виктор мчится обратно на своей Streetfighter, деньги припрятаны в сумке. На фоне слышится напряжённая музыка.',
        action: 'narration'
      }
    ]
  },
  {
    id: 7,
    scene: 'Офис сержанта Джерри Мартинеса',
    image: 'https://cdn.poehali.dev/projects/b3560631-c2f1-45b8-9409-6de5940bd86c/files/b03aa58d-50a2-4de0-97fe-e8acbccde630.jpg',
    dialogue: [
      {
        character: 'Описание',
        text: 'Виктор заходит к Джерри, уставший, но с решимостью.',
        action: 'narration'
      },
      {
        character: 'Виктор',
        text: 'Вот ваши деньги, сержант.'
      },
      {
        character: 'Описание',
        text: 'Джерри принимает деньги с улыбкой.',
        action: 'narration'
      },
      {
        character: 'Джерри',
        text: 'Отлично, Вэнс! Так держать. Ты сделаешь себе имя в этом деле.'
      },
      {
        character: 'Описание',
        text: 'Виктор наблюдает за Джерри с недоверием, понимая, что это только начало его нового пути.',
        action: 'narration'
      }
    ]
  }
];

export default function ComicViewer2() {
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
            Эпизод 2: Сложные решения
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
