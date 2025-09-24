import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import PharmacyMap from '@/components/PharmacyMap';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchHistory, setSearchHistory] = useState([
    'Гевискон Форте',
    'Аспирин',
    'Парацетамол'
  ]);

  const samplePharmacies = [
    {
      id: 1,
      name: 'Аптека №1',
      address: 'ул. Невский пр., 25',
      distance: '0.2 км',
      availability: 'В наличии',
      price: '320 ₽',
      coordinates: { lat: 59.9311, lng: 30.3609 }
    },
    {
      id: 2, 
      name: 'Фармленд',
      address: 'ул. Московская, 15',
      distance: '0.5 км',
      availability: 'Осталось 3 шт.',
      price: '315 ₽',
      coordinates: { lat: 59.9280, lng: 30.3590 }
    },
    {
      id: 3,
      name: 'Аптечная сеть 36,6',
      address: 'пр. Ленина, 8',
      distance: '0.8 км',
      availability: 'Под заказ',
      price: '340 ₽',
      coordinates: { lat: 59.9250, lng: 30.3570 }
    }
  ];

  const sampleAnalogs = [
    {
      name: 'Ренни',
      composition: 'Кальция карбонат + Магния карбонат',
      price: '180 ₽',
      similarity: 85
    },
    {
      name: 'Маалокс',
      composition: 'Алюминия гидроксид + Магния гидроксид',
      price: '250 ₽', 
      similarity: 78
    },
    {
      name: 'Алмагель',
      composition: 'Алюминия гидроксид + Магния гидроксид',
      price: '220 ₽',
      similarity: 75
    }
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setSearchHistory(prev => [searchQuery, ...prev.filter(item => item !== searchQuery)].slice(0, 5));
      setSearchResults(samplePharmacies);
    }
  };

  return (
    <div className="min-h-screen bg-medical-light">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-medical-blue p-4 rounded-full mr-4">
              <Icon name="Plus" className="text-medical-white" size={32} />
            </div>
            <h1 className="text-4xl font-bold text-medical-dark">PharmFinder</h1>
          </div>
          <p className="text-medical-gray text-lg max-w-2xl mx-auto">
            Найдите ближайшие аптеки с нужным лекарством и подберите аналоги с похожим составом
          </p>
        </div>

        {/* Search Section */}
        <Card className="mb-8 shadow-lg border-0 bg-medical-white">
          <CardHeader>
            <CardTitle className="flex items-center text-medical-dark">
              <Icon name="Search" className="mr-2" size={24} />
              Поиск лекарства
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <Input
                placeholder="Введите название лекарства..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="text-lg py-3 border-medical-blue/20 focus:border-medical-blue"
              />
              <Button 
                onClick={handleSearch}
                className="px-8 py-3 bg-medical-blue hover:bg-medical-dark text-medical-white"
                size="lg"
              >
                <Icon name="Search" size={20} />
              </Button>
            </div>
            
            {/* Quick Search History */}
            {searchHistory.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-medical-gray mb-2">Недавние поиски:</p>
                <div className="flex flex-wrap gap-2">
                  {searchHistory.map((item, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-pointer hover:bg-medical-blue hover:text-medical-white transition-colors"
                      onClick={() => {
                        setSearchQuery(item);
                        setSearchResults(samplePharmacies);
                      }}
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Section */}
        {searchResults.length > 0 && (
          <Tabs defaultValue="pharmacies" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-medical-white">
              <TabsTrigger value="pharmacies" className="data-[state=active]:bg-medical-blue data-[state=active]:text-medical-white">
                <Icon name="MapPin" className="mr-2" size={16} />
                Ближайшие аптеки
              </TabsTrigger>
              <TabsTrigger value="analogs" className="data-[state=active]:bg-medical-blue data-[state=active]:text-medical-white">
                <Icon name="Pills" className="mr-2" size={16} />
                Аналоги препарата
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pharmacies" className="mt-6">
              <PharmacyMap pharmacies={samplePharmacies} />
            </TabsContent>



            <TabsContent value="analogs" className="mt-6">
              <div className="space-y-4">
                {sampleAnalogs.map((analog, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow bg-medical-white">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <Icon name="Pills" className="text-medical-blue mr-2" size={20} />
                            <h3 className="text-lg font-semibold text-medical-dark">{analog.name}</h3>
                            <Badge className="ml-3 bg-medical-light text-medical-blue">
                              {analog.similarity}% схожесть
                            </Badge>
                          </div>
                          <div className="flex items-center text-medical-gray mb-3">
                            <Icon name="Beaker" className="mr-2" size={16} />
                            <span className="text-sm">{analog.composition}</span>
                          </div>
                          <span className="text-xl font-bold text-medical-blue">{analog.price}</span>
                        </div>
                        <Button className="bg-medical-blue hover:bg-medical-dark text-medical-white">
                          <Icon name="ShoppingCart" className="mr-2" size={16} />
                          Найти аптеки
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}

        {/* Empty State */}
        {searchResults.length === 0 && (
          <Card className="text-center py-12 bg-medical-white border-2 border-dashed border-medical-blue/30">
            <CardContent>
              <Icon name="Search" className="mx-auto mb-4 text-medical-blue" size={64} />
              <h3 className="text-xl font-semibold text-medical-dark mb-2">
                Начните поиск лекарства
              </h3>
              <p className="text-medical-gray max-w-md mx-auto">
                Введите название препарата в поисковую строку выше, чтобы найти ближайшие аптеки и аналоги
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;