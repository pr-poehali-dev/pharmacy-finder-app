import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Pharmacy {
  id: number;
  name: string;
  address: string;
  distance: string;
  availability: string;
  price: string;
  phone?: string;
  workingHours?: string;
  coordinates: { lat: number; lng: number };
}

interface PharmacyMapProps {
  pharmacies: Pharmacy[];
}

const PharmacyMap = ({ pharmacies }: PharmacyMapProps) => {
  const handleCall = (pharmacy: Pharmacy) => {
    if (pharmacy.phone) {
      window.open(`tel:${pharmacy.phone}`, '_self');
    }
  };

  const handleRoute = (pharmacy: Pharmacy) => {
    const { lat, lng } = pharmacy.coordinates;
    const url = `https://yandex.ru/maps/?pt=${lng},${lat}&z=18&l=map`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Interactive Map of Saint Petersburg */}
      <Card className="overflow-hidden bg-white">
        <CardContent className="p-0">
          <div className="h-96 bg-gradient-to-br from-pharmacy-light to-pharmacy-primary/10 relative">
            {/* Map visualization with Saint Petersburg landmarks */}
            <div className="absolute inset-0 opacity-30">
              <svg viewBox="0 0 400 300" className="w-full h-full">
                {/* Нева река */}
                <path
                  d="M50,150 Q150,120 200,140 Q250,160 350,130"
                  stroke="#3B82F6"
                  strokeWidth="8"
                  fill="none"
                />
                {/* Главные улицы СПб */}
                <line x1="0" y1="100" x2="400" y2="120" stroke="#64748B" strokeWidth="3" opacity="0.6" />
                <line x1="0" y1="180" x2="400" y2="160" stroke="#64748B" strokeWidth="3" opacity="0.6" />
                <line x1="100" y1="0" x2="120" y2="300" stroke="#64748B" strokeWidth="3" opacity="0.6" />
                <line x1="200" y1="0" x2="220" y2="300" stroke="#64748B" strokeWidth="3" opacity="0.6" />
                <line x1="300" y1="0" x2="280" y2="300" stroke="#64748B" strokeWidth="3" opacity="0.6" />
                
                {/* Landmarks */}
                <circle cx="200" cy="140" r="5" fill="#F59E0B" /> {/* Эрмитаж */}
                <circle cx="180" cy="120" r="4" fill="#EF4444" /> {/* Исаакий */}
              </svg>
            </div>

            {/* Pharmacy markers on SPb map */}
            {pharmacies.map((pharmacy, index) => (
              <div
                key={pharmacy.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10"
                style={{
                  left: `${15 + (index * 18) % 70}%`,
                  top: `${25 + (index * 12) % 50}%`
                }}
                onClick={() => handleRoute(pharmacy)}
              >
                <div className="relative">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg border-3 border-white
                    ${pharmacy.availability.includes('В наличии') ? 'bg-pharmacy-success' : 'bg-pharmacy-warning'}
                    group-hover:scale-110 transition-all duration-200 cursor-pointer
                  `}>
                    <Icon name="Plus" size={16} />
                  </div>
                  
                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 hidden group-hover:block">
                    <div className="bg-white p-3 rounded-lg shadow-xl border min-w-60 max-w-xs">
                      <h4 className="font-semibold text-pharmacy-dark text-sm mb-1">{pharmacy.name}</h4>
                      <p className="text-xs text-pharmacy-gray mb-2">{pharmacy.address}</p>
                      <div className="flex items-center justify-between mb-2">
                        <Badge 
                          size="sm"
                          className={pharmacy.availability.includes('В наличии') ? 'bg-pharmacy-success text-white' : 'bg-pharmacy-warning text-white'}
                        >
                          {pharmacy.availability}
                        </Badge>
                        <span className="font-bold text-pharmacy-primary text-sm">{pharmacy.price}</span>
                      </div>
                      {pharmacy.workingHours && (
                        <div className="flex items-center text-xs text-pharmacy-gray">
                          <Icon name="Clock" size={12} className="mr-1" />
                          {pharmacy.workingHours}
                        </div>
                      )}
                    </div>
                    <div className="w-3 h-3 bg-white border-r border-b transform rotate-45 absolute top-full left-1/2 -translate-x-1/2 -mt-1.5 shadow-sm"></div>
                  </div>
                </div>
              </div>
            ))}

            {/* Map overlay with city info */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-md">
              <div className="flex items-center gap-2">
                <Icon name="MapPin" className="text-pharmacy-primary" size={16} />
                <div>
                  <h3 className="font-semibold text-pharmacy-dark text-sm">Санкт-Петербург</h3>
                  <p className="text-xs text-pharmacy-gray">{pharmacies.length} аптек найдено</p>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-md">
              <div className="text-xs font-semibold text-pharmacy-dark mb-2">Статус наличия:</div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 bg-pharmacy-success rounded-full"></div>
                  <span>В наличии</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 bg-pharmacy-warning rounded-full"></div>
                  <span>Под заказ</span>
                </div>
              </div>
            </div>

            {/* Central landmark label */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-pharmacy-primary/80 text-white px-3 py-1 rounded-full text-xs font-medium">
              Невский проспект
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Pharmacy List */}
      <div className="grid gap-4 md:grid-cols-2">
        {pharmacies.map((pharmacy, index) => (
          <Card key={pharmacy.id} className="hover:shadow-lg transition-all bg-white border-0 shadow-md border-l-4 border-l-pharmacy-primary">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full mr-3 ${pharmacy.availability.includes('В наличии') ? 'bg-pharmacy-success' : 'bg-pharmacy-warning'}`}>
                      <Icon name="Plus" className="text-white" size={16} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-pharmacy-dark">{pharmacy.name}</h3>
                      <p className="text-sm text-pharmacy-gray">{pharmacy.address}</p>
                      {pharmacy.workingHours && (
                        <p className="text-xs text-pharmacy-gray flex items-center mt-1">
                          <Icon name="Clock" size={12} className="mr-1" />
                          {pharmacy.workingHours}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      className={pharmacy.availability.includes('В наличии') ? 'bg-pharmacy-success text-white' : 'bg-pharmacy-warning text-white'}
                    >
                      {pharmacy.availability}
                    </Badge>
                    <p className="text-xs text-pharmacy-gray mt-1">{pharmacy.distance}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t border-pharmacy-light">
                  <span className="text-xl font-bold text-pharmacy-primary">{pharmacy.price}</span>
                  <div className="flex gap-2">
                    {pharmacy.phone && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-pharmacy-primary text-pharmacy-primary hover:bg-pharmacy-primary hover:text-white"
                        onClick={() => handleCall(pharmacy)}
                      >
                        <Icon name="Phone" className="mr-1" size={14} />
                        Позвонить
                      </Button>
                    )}
                    <Button 
                      size="sm" 
                      className="bg-pharmacy-primary hover:bg-pharmacy-dark text-white"
                      onClick={() => handleRoute(pharmacy)}
                    >
                      <Icon name="Navigation" className="mr-1" size={14} />
                      Маршрут
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PharmacyMap;