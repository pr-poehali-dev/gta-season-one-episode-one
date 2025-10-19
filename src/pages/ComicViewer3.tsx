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
    scene: 'Офис сержанта Джерри Мартинеса — Вечер',
    image: 'https://cdn.poehali.dev/projects/b3560631-c2f1-45b8-9409-6de5940bd86c/files/9ddc439d-cf24-445e-8f37-8c180a25223b.jpg',
    dialogue: [
      {
        character: 'Описание',
        text: 'Виктор Вэнс входит в кабинет сержанта Джерри Мартинеса. Джерри увлечённо смотрит фильм «Кэнди Сакс» на старом телевизоре.',
        action: 'narration'
      },
      {
        character: 'Джерри',
        text: 'Венс! Подходи. Есть дело.',
        action: 'не отрываясь от экрана'
      },
      {
        character: 'Виктор',
        text: 'Что на этот раз, сержант?'
      },
      {
        character: 'Джерри',
        text: 'Нужна проститутка по имени Мэри. Найди её и привези сюда.'
      },
      {
        character: 'Виктор',
        text: 'Но у меня есть наркотики, спрятанные в казарме.',
        action: 'немного колебался'
      },
      {
        character: 'Джерри',
        text: 'Не переживай, я заберу их за тобой, когда ты вернёшься с Мэри.'
      }
    ]
  },
  {
    id: 2,
    scene: 'Склад Фила Кэссиди',
    image: 'https://cdn.poehali.dev/projects/b3560631-c2f1-45b8-9409-6de5940bd86c/files/7293bc18-b0fb-4c9c-bba0-6c6520ad50da.jpg',
    dialogue: [
      {
        character: 'Описание',
        text: 'Виктор направляется к Филу, где тот готовит красный Stinger.',
        action: 'narration'
      },
      {
        character: 'Фил',
        text: 'Вот твой транспорт, Виктор. Удачи с поисками.'
      }
    ]
  },
  {
    id: 3,
    scene: 'Вайс-Порт — На поисках Мэри',
    image: 'https://cdn.poehali.dev/projects/b3560631-c2f1-45b8-9409-6de5940bd86c/files/ff0baee4-e05b-4986-a81f-43125a086045.jpg',
    dialogue: [
      {
        character: 'Описание',
        text: 'Виктор доезжает до Вайс-Порта, его глаза внимательно оглядывают окружающих, ищет Мэри, но случайно находит другую проститутку — Мону.',
        action: 'narration'
      },
      {
        character: 'Виктор',
        text: 'Ты не знаешь, где Мэри?'
      },
      {
        character: 'Мона',
        text: 'Она на вечеринке на Старфиш-Айленде.'
      },
      {
        character: 'Описание',
        text: 'Виктор, не медля, забирает Мону и мчится к острову.',
        action: 'narration'
      }
    ]
  },
  {
    id: 4,
    scene: 'Старфиш-Айленд — Вечеринка',
    image: 'https://cdn.poehali.dev/projects/b3560631-c2f1-45b8-9409-6de5940bd86c/files/f6d233d1-b51f-4115-a010-ea06f2197d18.jpg',
    dialogue: [
      {
        character: 'Описание',
        text: 'Виктор и Мона приходят на вечеринку. Музыка играет, люди веселятся. Виктор осматривает толпу и находит Мэри.',
        action: 'narration'
      },
      {
        character: 'Виктор',
        text: 'Мэри, у нас время уходить.'
      },
      {
        character: 'Первый участник',
        text: 'Ты что, не понял, что вечеринка не окончена?',
        action: 'недовольный'
      }
    ]
  },
  {
    id: 5,
    scene: 'Вечеринка — Драка',
    image: 'https://cdn.poehali.dev/projects/b3560631-c2f1-45b8-9409-6de5940bd86c/files/990b366f-abab-4694-ad3a-af3064caad4b.jpg',
    dialogue: [
      {
        character: 'Описание',
        text: 'Виктор не теряет время. Он достаёт своё оружие и начинает действовать. В скоротечной драке оба участника убиты.',
        action: 'narration'
      }
    ]
  },
  {
    id: 6,
    scene: 'Возвращение на авиабазу Форт-Бакстер',
    image: 'https://cdn.poehali.dev/projects/b3560631-c2f1-45b8-9409-6de5940bd86c/files/f40b0b20-54d1-4fbc-9f35-bf89ec06d44b.jpg',
    dialogue: [
      {
        character: 'Описание',
        text: 'Виктор и Мэри возвращаются. Виктор видит сержанта Пеппа, который уже ждет его.',
        action: 'narration'
      },
      {
        character: 'Сержант Пеппа',
        text: 'Эй, Вэнс, где наркотики, о которых ты говорил?'
      },
      {
        character: 'Виктор',
        text: 'Я их оставил в казарме.'
      },
      {
        character: 'Сержант Пеппа',
        text: 'Ты что, с ума сошёл? Наши правила – ты больше не на базе.',
        action: 'смотрит с недоумением'
      },
      {
        character: 'Описание',
        text: 'Виктор чувствует, как его жизнь меняется. Он прогоняется с базы, чувствуя себя обычным гражданином в повседневной одежде.',
        action: 'narration'
      }
    ]
  },
  {
    id: 7,
    scene: 'Бэйшор-авеню, 101 — Новая глава',
    image: 'https://cdn.poehali.dev/projects/b3560631-c2f1-45b8-9409-6de5940bd86c/files/8e2e4fc6-5d68-47d3-be0c-0a3dcb023104.jpg',
    dialogue: [
      {
        character: 'Описание',
        text: 'Виктор, немного потерянный, получает сообщение на пейджер от Фила.',
        action: 'narration'
      },
      {
        character: 'Фил',
        text: 'Эй, у меня есть работа. Приезжай ко мне.',
        action: 'по пейджеру'
      },
      {
        character: 'Описание',
        text: 'Виктор направляется в дом Фила по адресу Бэйшор-авеню, 101. Он останавливается, осматриваясь вокруг.',
        action: 'narration'
      },
      {
        character: 'Описание',
        text: 'Сцена заканчивается на слегка пессимистичном выражении лица Виктора, осознающего, что его жизнь вступает в новую главу.',
        action: 'narration'
      }
    ]
  }
];

export default function ComicViewer3() {
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
            Эпизод 3: Новая жизнь
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
