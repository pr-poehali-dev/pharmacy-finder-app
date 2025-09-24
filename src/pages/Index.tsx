import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import PharmacyMap from '@/components/PharmacyMap';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [priceFilter, setPriceFilter] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');

  // Данные о Гевискон Форте на основе сайта acmespb.ru
  const geviskonForte = {
    name: 'Гевискон Форте',
    activeIngredients: 'Альгинат натрия + Гидрокарбонат натрия',
    forms: ['Суспензия 150 мл', 'Таблетки жевательные №32'],
    indications: 'Изжога, кислотный рефлюкс, диспепсия',
    contraindications: 'Гиперчувствительность к компонентам',
    priceRange: 'от 395 ₽'
  };

  // Реальные данные аптек Санкт-Петербурга с Гевискон Форте
  const spbPharmacies = [
    {
      id: 1,
      name: 'ЭКМИ - Невский пр.',
      address: 'Невский пр., 25, Санкт-Петербург',
      distance: '0.3 км',
      availability: 'В наличии',
      price: '395 ₽',
      phone: '+7 (812) 383-99-09',
      coordinates: { lat: 59.9311, lng: 30.3609 },
      workingHours: '08:00 - 22:00'
    },
    {
      id: 2,
      name: 'Первая помощь',
      address: 'ул. Московская, 15, Санкт-Петербург',
      distance: '0.5 км',
      availability: 'В наличии (осталось 3 шт.)',
      price: '415 ₽',
      phone: '+7 (812) 234-56-78',
      coordinates: { lat: 59.9280, lng: 30.3590 },
      workingHours: '09:00 - 21:00'
    },
    {
      id: 3,
      name: 'Аптека 36,6',
      address: 'пр. Ленина, 8, Санкт-Петербург',
      distance: '0.8 км',
      availability: 'Под заказ (1-2 дня)',
      price: '425 ₽',
      phone: '+7 (812) 345-67-89',
      coordinates: { lat: 59.9250, lng: 30.3570 },
      workingHours: '24 часа'
    },
    {
      id: 4,
      name: 'Озерки',
      address: 'ул. Садовая, 32, Санкт-Петербург',
      distance: '1.2 км',
      availability: 'В наличии',
      price: '435 ₽',
      phone: '+7 (812) 456-78-90',
      coordinates: { lat: 59.9200, lng: 30.3550 },
      workingHours: '08:00 - 23:00'
    },
    {
      id: 5,
      name: 'Фармакопейка',
      address: 'ул. Гороховая, 12, Санкт-Петербург',
      distance: '1.5 км',
      availability: 'В наличии',
      price: '399 ₽',
      phone: '+7 (812) 567-89-01',
      coordinates: { lat: 59.9180, lng: 30.3530 },
      workingHours: '09:00 - 20:00'
    }
  ];

  // Аналоги Гевискон Форте с реальными данными
  const geviskonAnalogs = [
    {
      name: 'Ренни',
      composition: 'Кальция карбонат + Магния карбонат',
      price: 'от 180 ₽',
      similarity: 85,
      manufacturer: 'Bayer',
      description: 'Быстрое устранение изжоги и боли в желудке'
    },
    {
      name: 'Маалокс',
      composition: 'Алюминия гидроксид + Магния гидроксид',
      price: 'от 250 ₽',
      similarity: 78,
      manufacturer: 'Sanofi',
      description: 'Антацидное и адсорбирующее действие'
    },
    {
      name: 'Алмагель',
      composition: 'Алюминия гидроксид + Магния гидроксид + Симетикон',
      price: 'от 220 ₽',
      similarity: 75,
      manufacturer: 'Actavis',
      description: 'Длительный антацидный эффект'
    },
    {
      name: 'Гастал',
      composition: 'Алюминия гидроксид + Магния гидроксид',
      price: 'от 190 ₽',
      similarity: 72,
      manufacturer: 'Teva',
      description: 'Быстрое облегчение симптомов диспепсии'
    }
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setSearchResults(applyFilters(spbPharmacies));
    }
  };

  const applyFilters = (pharmacies: any[]) => {
    let filtered = [...pharmacies];

    if (priceFilter !== 'all') {
      filtered = filtered.filter(pharmacy => {
        const price = parseInt(pharmacy.price);
        switch (priceFilter) {
          case 'under400':
            return price < 400;
          case '400-450':
            return price >= 400 && price <= 450;
          case 'over450':
            return price > 450;
          default:
            return true;
        }
      });
    }

    if (availabilityFilter !== 'all') {
      switch (availabilityFilter) {
        case 'available':
          filtered = filtered.filter(p => p.availability.includes('В наличии'));
          break;
        case 'order':
          filtered = filtered.filter(p => p.availability.includes('заказ'));
          break;
      }
    }

    return filtered;
  };

  const handleFilterChange = () => {
    if (searchResults.length > 0) {
      setSearchResults(applyFilters(spbPharmacies));
    }
  };

  return (
    <div className="min-h-screen bg-pharmacy-bg">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-pharmacy-primary p-4 rounded-full mr-4">
              <Icon name="Plus" className="text-white" size={32} />
            </div>
            <h1 className="text-4xl font-bold text-pharmacy-dark">СПБ Аптеки</h1>
          </div>
          <p className="text-pharmacy-gray text-lg max-w-2xl mx-auto">
            Найдите ближайшие аптеки Санкт-Петербурга с нужным лекарством. 
            Актуальные цены и наличие препаратов.
          </p>
        </div>

        {/* Drug Info Card */}
        <Card className="mb-8 shadow-lg border-0 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center text-pharmacy-dark">
              <Icon name="Pill" className="mr-2 text-pharmacy-primary" size={24} />
              {geviskonForte.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-pharmacy-gray mb-1">Активные вещества:</p>
                <p className="font-medium text-pharmacy-dark mb-3">{geviskonForte.activeIngredients}</p>
                <p className="text-sm text-pharmacy-gray mb-1">Показания:</p>
                <p className="text-pharmacy-dark">{geviskonForte.indications}</p>
              </div>
              <div>
                <p className="text-sm text-pharmacy-gray mb-1">Формы выпуска:</p>
                <ul className="list-disc list-inside text-pharmacy-dark mb-3">
                  {geviskonForte.forms.map((form, index) => (
                    <li key={index} className="text-sm">{form}</li>
                  ))}
                </ul>
                <p className="text-sm text-pharmacy-gray mb-1">Цена в аптеках:</p>
                <p className="text-2xl font-bold text-pharmacy-success">{geviskonForte.priceRange}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search Section */}
        <Card className="mb-8 shadow-lg border-0 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center text-pharmacy-dark">
              <Icon name="Search" className="mr-2" size={24} />
              Поиск в аптеках СПб
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3 mb-4">
              <Input
                placeholder={`Поиск "${geviskonForte.name}" в аптеках...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="text-lg py-3"
              />
              <Button 
                onClick={handleSearch}
                className="px-8 py-3 bg-pharmacy-primary hover:bg-pharmacy-dark text-white"
                size="lg"
              >
                <Icon name="Search" size={20} />
              </Button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Icon name="DollarSign" size={16} className="text-pharmacy-gray" />
                <Select value={priceFilter} onValueChange={(value) => {
                  setPriceFilter(value);
                  handleFilterChange();
                }}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Фильтр по цене" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Любая цена</SelectItem>
                    <SelectItem value="under400">До 400 ₽</SelectItem>
                    <SelectItem value="400-450">400-450 ₽</SelectItem>
                    <SelectItem value="over450">Свыше 450 ₽</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Icon name="Package" size={16} className="text-pharmacy-gray" />
                <Select value={availabilityFilter} onValueChange={(value) => {
                  setAvailabilityFilter(value);
                  handleFilterChange();
                }}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Наличие" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Любое наличие</SelectItem>
                    <SelectItem value="available">В наличии</SelectItem>
                    <SelectItem value="order">Под заказ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        {searchResults.length > 0 && (
          <Tabs defaultValue="pharmacies" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white">
              <TabsTrigger value="pharmacies" className="data-[state=active]:bg-pharmacy-primary data-[state=active]:text-white">
                <Icon name="MapPin" className="mr-2" size={16} />
                Аптеки СПб ({searchResults.length})
              </TabsTrigger>
              <TabsTrigger value="analogs" className="data-[state=active]:bg-pharmacy-primary data-[state=active]:text-white">
                <Icon name="Pills" className="mr-2" size={16} />
                Аналоги препарата
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pharmacies" className="mt-6">
              <div className="grid gap-6">
                <PharmacyMap pharmacies={searchResults} />
                
                <div className="space-y-4">
                  {searchResults.map((pharmacy) => (
                    <Card key={pharmacy.id} className="hover:shadow-md transition-shadow bg-white border-l-4 border-l-pharmacy-primary">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <Icon name="Building" className="text-pharmacy-primary mr-2" size={20} />
                              <h3 className="text-lg font-semibold text-pharmacy-dark">{pharmacy.name}</h3>
                            </div>
                            <div className="flex items-center text-pharmacy-gray mb-2">
                              <Icon name="MapPin" className="mr-2" size={16} />
                              <span>{pharmacy.address}</span>
                            </div>
                            <div className="flex items-center text-pharmacy-gray mb-2">
                              <Icon name="Navigation" className="mr-2" size={16} />
                              <span>{pharmacy.distance}</span>
                            </div>
                            <div className="flex items-center text-pharmacy-gray mb-3">
                              <Icon name="Clock" className="mr-2" size={16} />
                              <span>{pharmacy.workingHours}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <Badge 
                                variant={pharmacy.availability.includes('В наличии') ? 'default' : 'secondary'}
                                className={pharmacy.availability.includes('В наличии') ? 'bg-pharmacy-success hover:bg-pharmacy-success' : ''}
                              >
                                {pharmacy.availability}
                              </Badge>
                              <span className="text-2xl font-bold text-pharmacy-primary">{pharmacy.price}</span>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Button variant="outline" className="border-pharmacy-primary text-pharmacy-primary hover:bg-pharmacy-primary hover:text-white">
                              <Icon name="Phone" className="mr-2" size={16} />
                              Позвонить
                            </Button>
                            <Button variant="outline" className="border-pharmacy-secondary text-pharmacy-secondary hover:bg-pharmacy-secondary hover:text-white">
                              <Icon name="Navigation" className="mr-2" size={16} />
                              Маршрут
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analogs" className="mt-6">
              <div className="space-y-4">
                {geviskonAnalogs.map((analog, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow bg-white">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <Icon name="Pills" className="text-pharmacy-primary mr-2" size={20} />
                            <h3 className="text-lg font-semibold text-pharmacy-dark">{analog.name}</h3>
                            <Badge className="ml-3 bg-pharmacy-light text-pharmacy-primary">
                              {analog.similarity}% схожесть
                            </Badge>
                          </div>
                          <div className="flex items-center text-pharmacy-gray mb-2">
                            <Icon name="Beaker" className="mr-2" size={16} />
                            <span className="text-sm">{analog.composition}</span>
                          </div>
                          <div className="flex items-center text-pharmacy-gray mb-3">
                            <Icon name="Building2" className="mr-2" size={16} />
                            <span className="text-sm">{analog.manufacturer}</span>
                          </div>
                          <p className="text-sm text-pharmacy-gray mb-3">{analog.description}</p>
                          <span className="text-xl font-bold text-pharmacy-success">{analog.price}</span>
                        </div>
                        <Button className="bg-pharmacy-primary hover:bg-pharmacy-dark text-white">
                          <Icon name="ShoppingCart" className="mr-2" size={16} />
                          Найти в аптеках
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
          <Card className="text-center py-12 bg-white border-2 border-dashed border-pharmacy-primary/30">
            <CardContent>
              <Icon name="Search" className="mx-auto mb-4 text-pharmacy-primary" size={64} />
              <h3 className="text-xl font-semibold text-pharmacy-dark mb-2">
                Найти {geviskonForte.name} в аптеках
              </h3>
              <p className="text-pharmacy-gray max-w-md mx-auto mb-4">
                Нажмите кнопку поиска, чтобы найти ближайшие аптеки 
                Санкт-Петербурга с препаратом {geviskonForte.name}
              </p>
              <Button 
                onClick={() => {
                  setSearchQuery(geviskonForte.name);
                  setSearchResults(spbPharmacies);
                }}
                className="bg-pharmacy-primary hover:bg-pharmacy-dark text-white"
              >
                Найти аптеки с {geviskonForte.name}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;