import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const episodes = [
  {
    id: 1,
    title: 'Первые шаги в тёмный мир',
    duration: '22 мин',
    description: 'Виктор Вэнс прибывает на авиабазу Форт-Бакстер. Сержант Мартинес предлагает ему первое опасное задание.',
    videoUrl: '',
    thumbnail: 'https://cdn.poehali.dev/projects/b3560631-c2f1-45b8-9409-6de5940bd86c/files/86dbc5ae-8f9b-4a70-917a-3dc688695b1f.jpg'
  }
];

export default function Episode() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const episodeId = parseInt(searchParams.get('id') || '1');
  
  const episode = episodes.find(ep => ep.id === episodeId) || episodes[0];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <Icon name="ArrowLeft" size={20} />
          <span>Назад к списку</span>
        </button>

        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <Badge className="bg-primary text-primary-foreground mb-3">
              Эпизод {episode.id}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{episode.title}</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Icon name="Clock" size={18} />
              <span>{episode.duration}</span>
            </div>
          </div>

          <Card className="overflow-hidden bg-card border-2 border-border mb-8">
            {episode.videoUrl ? (
              <video 
                controls 
                className="w-full aspect-video bg-black"
                poster={episode.thumbnail}
              >
                <source src={episode.videoUrl} type="video/mp4" />
                Ваш браузер не поддерживает видео
              </video>
            ) : (
              <div className="relative w-full aspect-video bg-muted flex items-center justify-center">
                <img 
                  src={episode.thumbnail} 
                  alt={episode.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                />
                <div className="text-center z-10 p-8">
                  <Icon name="Play" size={64} className="mx-auto mb-4 text-primary" />
                  <p className="text-xl font-bold mb-2">Видео скоро появится</p>
                  <p className="text-muted-foreground">Эпизод находится в производстве</p>
                </div>
              </div>
            )}
          </Card>

          <div className="bg-card p-6 border-2 border-border comic-shadow">
            <h2 className="text-2xl font-bold mb-4">Описание эпизода</h2>
            <p className="text-muted-foreground leading-relaxed">{episode.description}</p>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Следующие эпизоды</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {episodes.filter(ep => ep.id !== episodeId).map((ep) => (
                <Card
                  key={ep.id}
                  onClick={() => navigate(`/episode?id=${ep.id}`)}
                  className="overflow-hidden bg-card border-2 border-border hover-scale cursor-pointer group"
                >
                  <div className="flex gap-4 p-4">
                    <img 
                      src={ep.thumbnail} 
                      alt={ep.title}
                      className="w-32 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <Badge className="bg-primary text-primary-foreground mb-2 text-xs">
                        Эпизод {ep.id}
                      </Badge>
                      <h3 className="font-bold mb-1 text-sm">{ep.title}</h3>
                      <div className="flex items-center gap-1 text-muted-foreground text-xs">
                        <Icon name="Clock" size={12} />
                        <span>{ep.duration}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
