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
  coordinates: { lat: number; lng: number };
}

interface PharmacyMapProps {
  pharmacies: Pharmacy[];
}

const PharmacyMap = ({ pharmacies }: PharmacyMapProps) => {
  return (
    <div className="space-y-6">
      {/* Interactive Map Placeholder */}
      <Card className="overflow-hidden bg-medical-white">
        <CardContent className="p-0">
          <div className="h-96 bg-gradient-to-br from-medical-light to-medical-blue/20 relative flex items-center justify-center">
            {/* Map visualization */}
            <div className="absolute inset-4 bg-medical-white/80 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Icon name="Map" className="mx-auto mb-4 text-medical-blue" size={48} />
                <h3 className="text-lg font-semibold text-medical-dark mb-2">
                  Карта аптек
                </h3>
                <p className="text-medical-gray text-sm">
                  Здесь будет отображаться интерактивная карта с маркерами аптек
                </p>
              </div>
            </div>
            
            {/* Sample pharmacy markers */}
            {pharmacies.slice(0, 3).map((pharmacy, index) => (
              <div
                key={pharmacy.id}
                className="absolute bg-medical-blue text-medical-white p-2 rounded-full shadow-lg animate-pulse"
                style={{
                  left: `${20 + index * 25}%`,
                  top: `${30 + index * 15}%`,
                }}
              >
                <Icon name="Plus" size={16} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pharmacy List */}
      <div className="grid gap-4 md:grid-cols-2">
        {pharmacies.map((pharmacy) => (
          <Card key={pharmacy.id} className="hover:shadow-lg transition-all bg-medical-white border-0 shadow-md">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div className="bg-medical-blue p-2 rounded-full mr-3">
                      <Icon name="Plus" className="text-medical-white" size={16} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-medical-dark">{pharmacy.name}</h3>
                      <p className="text-sm text-medical-gray">{pharmacy.address}</p>
                    </div>
                  </div>
                  <Badge
                    variant={pharmacy.availability === 'В наличии' ? 'default' : 'secondary'}
                    className={pharmacy.availability === 'В наличии' ? 'bg-green-500' : ''}
                  >
                    {pharmacy.availability}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-medical-gray">
                    <Icon name="Navigation" className="mr-1" size={14} />
                    <span className="text-sm">{pharmacy.distance}</span>
                  </div>
                  <span className="font-bold text-medical-blue">{pharmacy.price}</span>
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 border-medical-blue text-medical-blue hover:bg-medical-blue hover:text-medical-white">
                    <Icon name="Phone" className="mr-1" size={14} />
                    Позвонить
                  </Button>
                  <Button size="sm" className="flex-1 bg-medical-blue hover:bg-medical-dark text-medical-white">
                    <Icon name="Navigation" className="mr-1" size={14} />
                    Маршрут
                  </Button>
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