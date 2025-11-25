import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Slider } from '@/components/ui/slider';

const dealers = [
  { id: 1, name: 'Geely Центр Москва', location: 'ЦАО' },
  { id: 2, name: 'Geely Юг', location: 'ЮЗАО' },
  { id: 3, name: 'Geely Север', location: 'САО' },
];

const cars = [
  {
    id: 1,
    model: 'Coolray',
    type: 'Компактный кроссовер',
    image: 'https://cdn.poehali.dev/projects/417f6b90-e56a-4f11-9948-1229868c6938/files/e202a57f-156f-48de-87c5-5d155ad217b4.jpg',
    prices: [
      { dealerId: 1, price: 2190000 },
      { dealerId: 2, price: 2150000 },
      { dealerId: 3, price: 2170000 },
    ],
    specs: {
      engine: '1.5T, 150 л.с.',
      transmission: 'CVT',
      drive: 'Передний',
    }
  },
  {
    id: 2,
    model: 'Atlas Pro',
    type: 'Среднеразмерный кроссовер',
    image: 'https://cdn.poehali.dev/projects/417f6b90-e56a-4f11-9948-1229868c6938/files/9a022847-941f-45c2-bae5-0576508edded.jpg',
    prices: [
      { dealerId: 1, price: 2890000 },
      { dealerId: 2, price: 2850000 },
      { dealerId: 3, price: 2870000 },
    ],
    specs: {
      engine: '2.0T, 238 л.с.',
      transmission: 'АТ8',
      drive: 'Полный',
    }
  },
  {
    id: 3,
    model: 'Tugella',
    type: 'Купе-кроссовер',
    image: 'https://cdn.poehali.dev/projects/417f6b90-e56a-4f11-9948-1229868c6938/files/1dfdec23-31b3-403b-a829-0cd3d115ff2b.jpg',
    prices: [
      { dealerId: 1, price: 3490000 },
      { dealerId: 2, price: 3450000 },
      { dealerId: 3, price: 3470000 },
    ],
    specs: {
      engine: '2.0T, 238 л.с.',
      transmission: 'АТ8',
      drive: 'Полный',
    }
  },
];

export default function Index() {
  const [selectedCar, setSelectedCar] = useState(cars[0]);
  const [downPayment, setDownPayment] = useState(30);
  const [loanTerm, setLoanTerm] = useState(36);
  const [financeType, setFinanceType] = useState<'credit' | 'leasing'>('credit');

  const minPrice = Math.min(...selectedCar.prices.map(p => p.price));
  const calculatedDownPayment = minPrice * (downPayment / 100);
  const loanAmount = minPrice - calculatedDownPayment;
  
  const interestRate = financeType === 'credit' ? 0.159 : 0.089;
  const monthlyRate = interestRate / 12;
  const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / (Math.pow(1 + monthlyRate, loanTerm) - 1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Car" className="text-primary-foreground" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold">Geely Москва</h1>
              <p className="text-sm text-muted-foreground">Сравнение цен дилеров</p>
            </div>
          </div>
          <Button variant="outline" className="gap-2">
            <Icon name="Phone" size={18} />
            <span className="hidden md:inline">Позвонить</span>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        <section className="text-center space-y-3 py-8">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Найдите лучшую цену на Geely
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Сравните предложения официальных дилеров Москвы и рассчитайте выгодные условия покупки
          </p>
        </section>

        <section>
          <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Icon name="Car" size={28} className="text-primary" />
            Каталог моделей
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {cars.map(car => {
              const minPrice = Math.min(...car.prices.map(p => p.price));
              const maxPrice = Math.max(...car.prices.map(p => p.price));
              const savings = maxPrice - minPrice;
              
              return (
                <Card 
                  key={car.id}
                  className={`overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${selectedCar.id === car.id ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => setSelectedCar(car)}
                >
                  <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 relative overflow-hidden">
                    <img 
                      src={car.image} 
                      alt={car.model}
                      className="w-full h-full object-cover"
                    />
                    {savings > 0 && (
                      <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
                        Экономия до {(savings / 1000).toFixed(0)}К ₽
                      </Badge>
                    )}
                  </div>
                  <div className="p-5 space-y-3">
                    <div>
                      <h4 className="text-xl font-bold">Geely {car.model}</h4>
                      <p className="text-sm text-muted-foreground">{car.type}</p>
                    </div>
                    
                    <div className="space-y-1.5 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Icon name="Gauge" size={16} />
                        <span>{car.specs.engine}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Icon name="Settings" size={16} />
                        <span>{car.specs.transmission}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Icon name="Cog" size={16} />
                        <span>{car.specs.drive} привод</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t">
                      <p className="text-sm text-muted-foreground">От</p>
                      <p className="text-2xl font-bold text-primary">
                        {(minPrice / 1000000).toFixed(2)} млн ₽
                      </p>
                    </div>

                    <div className="space-y-2">
                      {car.prices.map(priceInfo => {
                        const dealer = dealers.find(d => d.id === priceInfo.dealerId);
                        const isMin = priceInfo.price === minPrice;
                        return (
                          <div key={priceInfo.dealerId} className={`flex justify-between items-center text-sm p-2 rounded ${isMin ? 'bg-primary/10' : 'bg-muted/50'}`}>
                            <span className="font-medium">{dealer?.name}</span>
                            <span className={isMin ? 'text-primary font-semibold' : 'text-muted-foreground'}>
                              {(priceInfo.price / 1000000).toFixed(2)} млн
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="py-8">
          <Card className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Calculator" size={28} className="text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold">Калькулятор финансирования</h3>
                <p className="text-sm text-muted-foreground">Рассчитайте ежемесячный платеж</p>
              </div>
            </div>

            <Tabs value={financeType} onValueChange={(v) => setFinanceType(v as 'credit' | 'leasing')} className="space-y-6">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="credit" className="gap-2">
                  <Icon name="CreditCard" size={18} />
                  Кредит
                </TabsTrigger>
                <TabsTrigger value="leasing" className="gap-2">
                  <Icon name="FileText" size={18} />
                  Лизинг
                </TabsTrigger>
              </TabsList>

              <TabsContent value="credit" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <Label className="text-base mb-3 block">Выберите модель</Label>
                      <div className="grid gap-2">
                        {cars.map(car => (
                          <Button
                            key={car.id}
                            variant={selectedCar.id === car.id ? 'default' : 'outline'}
                            className="justify-start h-auto py-3"
                            onClick={() => setSelectedCar(car)}
                          >
                            <div className="text-left">
                              <div className="font-semibold">Geely {car.model}</div>
                              <div className="text-xs opacity-80">
                                от {(Math.min(...car.prices.map(p => p.price)) / 1000000).toFixed(2)} млн ₽
                              </div>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label className="text-base">Первоначальный взнос</Label>
                        <span className="text-sm font-semibold text-primary">{downPayment}%</span>
                      </div>
                      <Slider
                        value={[downPayment]}
                        onValueChange={(v) => setDownPayment(v[0])}
                        min={10}
                        max={80}
                        step={5}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>10%</span>
                        <span>80%</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label className="text-base">Срок кредита</Label>
                        <span className="text-sm font-semibold text-primary">{loanTerm} мес</span>
                      </div>
                      <Slider
                        value={[loanTerm]}
                        onValueChange={(v) => setLoanTerm(v[0])}
                        min={12}
                        max={84}
                        step={12}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>12 мес</span>
                        <span>84 мес</span>
                      </div>
                    </div>

                    <div className="p-4 bg-muted rounded-lg space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Процентная ставка:</span>
                        <span className="font-semibold">{(interestRate * 100).toFixed(1)}% годовых</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-xl p-6 space-y-4">
                      <h4 className="text-lg font-semibold opacity-90">Ежемесячный платеж</h4>
                      <p className="text-4xl font-bold">
                        {monthlyPayment.toLocaleString('ru-RU', { maximumFractionDigits: 0 })} ₽
                      </p>
                      <p className="text-sm opacity-75">
                        {financeType === 'credit' ? 'по кредиту' : 'по лизингу'}
                      </p>
                    </div>

                    <Card className="p-5 space-y-3 bg-card/50">
                      <h5 className="font-semibold text-lg">Детали расчета</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-muted-foreground">Стоимость автомобиля:</span>
                          <span className="font-semibold">{minPrice.toLocaleString('ru-RU')} ₽</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-muted-foreground">Первоначальный взнос:</span>
                          <span className="font-semibold">{calculatedDownPayment.toLocaleString('ru-RU', { maximumFractionDigits: 0 })} ₽</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-muted-foreground">Сумма финансирования:</span>
                          <span className="font-semibold">{loanAmount.toLocaleString('ru-RU', { maximumFractionDigits: 0 })} ₽</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-muted-foreground">Срок:</span>
                          <span className="font-semibold">{loanTerm} месяцев</span>
                        </div>
                        <div className="flex justify-between py-2 font-semibold text-base pt-3">
                          <span>Переплата:</span>
                          <span className="text-primary">
                            {((monthlyPayment * loanTerm) - loanAmount).toLocaleString('ru-RU', { maximumFractionDigits: 0 })} ₽
                          </span>
                        </div>
                      </div>
                    </Card>

                    <Button className="w-full h-12 text-base gap-2" size="lg">
                      <Icon name="Send" size={20} />
                      Отправить заявку
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="leasing" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <Label className="text-base mb-3 block">Выберите модель</Label>
                      <div className="grid gap-2">
                        {cars.map(car => (
                          <Button
                            key={car.id}
                            variant={selectedCar.id === car.id ? 'default' : 'outline'}
                            className="justify-start h-auto py-3"
                            onClick={() => setSelectedCar(car)}
                          >
                            <div className="text-left">
                              <div className="font-semibold">Geely {car.model}</div>
                              <div className="text-xs opacity-80">
                                от {(Math.min(...car.prices.map(p => p.price)) / 1000000).toFixed(2)} млн ₽
                              </div>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label className="text-base">Аванс по лизингу</Label>
                        <span className="text-sm font-semibold text-primary">{downPayment}%</span>
                      </div>
                      <Slider
                        value={[downPayment]}
                        onValueChange={(v) => setDownPayment(v[0])}
                        min={10}
                        max={80}
                        step={5}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>10%</span>
                        <span>80%</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label className="text-base">Срок лизинга</Label>
                        <span className="text-sm font-semibold text-primary">{loanTerm} мес</span>
                      </div>
                      <Slider
                        value={[loanTerm]}
                        onValueChange={(v) => setLoanTerm(v[0])}
                        min={12}
                        max={84}
                        step={12}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>12 мес</span>
                        <span>84 мес</span>
                      </div>
                    </div>

                    <div className="p-4 bg-muted rounded-lg space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Удорожание:</span>
                        <span className="font-semibold">{(interestRate * 100).toFixed(1)}% годовых</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Лизинг позволяет оптимизировать налоговую нагрузку для юридических лиц
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-xl p-6 space-y-4">
                      <h4 className="text-lg font-semibold opacity-90">Ежемесячный платеж</h4>
                      <p className="text-4xl font-bold">
                        {monthlyPayment.toLocaleString('ru-RU', { maximumFractionDigits: 0 })} ₽
                      </p>
                      <p className="text-sm opacity-75">по лизингу</p>
                    </div>

                    <Card className="p-5 space-y-3 bg-card/50">
                      <h5 className="font-semibold text-lg">Детали расчета</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-muted-foreground">Стоимость автомобиля:</span>
                          <span className="font-semibold">{minPrice.toLocaleString('ru-RU')} ₽</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-muted-foreground">Аванс:</span>
                          <span className="font-semibold">{calculatedDownPayment.toLocaleString('ru-RU', { maximumFractionDigits: 0 })} ₽</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-muted-foreground">Сумма финансирования:</span>
                          <span className="font-semibold">{loanAmount.toLocaleString('ru-RU', { maximumFractionDigits: 0 })} ₽</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-muted-foreground">Срок:</span>
                          <span className="font-semibold">{loanTerm} месяцев</span>
                        </div>
                        <div className="flex justify-between py-2 font-semibold text-base pt-3">
                          <span>Удорожание:</span>
                          <span className="text-primary">
                            {((monthlyPayment * loanTerm) - loanAmount).toLocaleString('ru-RU', { maximumFractionDigits: 0 })} ₽
                          </span>
                        </div>
                      </div>
                    </Card>

                    <Button className="w-full h-12 text-base gap-2" size="lg">
                      <Icon name="Send" size={20} />
                      Отправить заявку на лизинг
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </section>

        <section className="bg-card rounded-xl p-8 border">
          <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Icon name="MapPin" size={28} className="text-primary" />
            Дилеры Geely в Москве
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {dealers.map(dealer => (
              <Card key={dealer.id} className="p-5 hover:shadow-lg transition-shadow">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <h4 className="font-semibold text-lg">{dealer.name}</h4>
                    <Badge variant="outline">{dealer.location}</Badge>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Icon name="MapPin" size={16} />
                      <span>Москва, {dealer.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Phone" size={16} />
                      <span>+7 (495) 123-45-67</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-3 gap-2">
                    <Icon name="Navigation" size={16} />
                    Построить маршрут
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t bg-card/50 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Icon name="Car" size={20} className="text-primary" />
              <span className="text-sm">© 2024 Geely Москва. Сравнение цен дилеров</span>
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" size="sm">О проекте</Button>
              <Button variant="ghost" size="sm">Контакты</Button>
              <Button variant="ghost" size="sm">Политика конфиденциальности</Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
