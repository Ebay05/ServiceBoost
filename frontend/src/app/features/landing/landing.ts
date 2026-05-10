import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';

interface Section {
  subheader?: string;
  title: string;
  description: string;
  list?: string[];
  btnTextPri?: string;
  btnLinkPri?: string;
  btnTextSec?: string;
  btnLinkSec?: string;
  image?: string;
  accordion?: {
    title: string;
    content: string;
  }[];
}

@Component({
  selector: 'app-landing',
  imports: [ButtonModule, RouterLink, AccordionModule],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing {
  heroContent: Section[] = [
    {
      subheader: 'Prowadzenie warsztatu nie musi być trudne',
      title: 'Zarządzanie może być proste, szybkie i nowoczesne',
      description:
        'ServiceBoost to inteligentna platforma, która pomaga warsztatom działać sprawniej — od przyjmowania zleceń, przez zarządzanie pracownikami, aż po analizę wyników. Wszystko w jednym miejscu, zawsze pod ręką.',
      btnTextPri: 'Zacznij korzystać',
      btnLinkPri: '/app/dashboard',
      btnTextSec: 'Zobacz Demo',
      btnLinkSec: '/app/dashboard',
      image: 'homepage-hero.png',
    },
  ];

  featuresContent: Section[] = [
    {
      title: 'Nowoczesne rozwiązanie dla warsztatów',
      description:
        'ServiceBoost to inteligentna platforma stworzona dla warsztatów, które chcą pracować szybciej, bezpieczniej i bardziej profesjonalnie — na każdym urządzeniu i dla każdego użytkownika.',
      list: [
        'Aplikacja i baza danych oparte na rolach',
        'Wysokie bezpieczeństwo dzięki panelowi właściciela',
        'Dashboard zaprojektowany pod najważniejsze wskaźniki',
        'Intuicyjny i estetyczny interfejs',
        'Pełna dostępność zgodna z WCAG',
      ],
      btnTextPri: 'Otrzymaj dostęp',
      btnLinkPri: '/app/dashboard',
      image: 'homepage-mobile.png',
    },
  ];

  chartsContent: Section[] = [
    {
      subheader: 'Monitoruj swoje postępy',
      title: 'Korzystaj ze wskaźników, które pokazują realny wzrost Twojego warsztatu',
      description:
        'ServiceBoost daje Ci pełną kontrolę nad tym, co dzieje się w firmie — w czasie rzeczywistym. Analizuj kluczowe dane, wyciągaj wnioski i podejmuj lepsze decyzje każdego dnia.',
      accordion: [
        {
          title: 'Ilość zleceń',
          content:
            'Podział na przyjęte, w realizacji, opóźnione oraz wykonane — zawsze w jednym miejscu.',
        },

        {
          title: 'Przychody',
          content: 'Suma, średnie wartości zleceń, trendy miesiąc do miesiąca oraz prognozy.',
        },

        {
          title: 'Obłożenie pracowników',
          content: 'Sprawdzaj, kto jest najbardziej obciążony i gdzie możesz zoptymalizować pracę.',
        },

        {
          title: ' Najczęściej wykonywane usługi',
          content: 'Dowiedz się, co generuje największy zysk i gdzie warto inwestować.',
        },

        {
          title: 'Czas realizacji zleceń',
          content: 'Monitoruj średni czas napraw, identyfikuj wąskie gardła i usprawniaj procesy.',
        },
        {
          title: 'Powracający klienci',
          content: 'Mierz lojalność klientów i skuteczność obsługi.',
        },
      ],
      image: 'homepage-charts.png',
    },
  ];

  faqContent: Section[] = [
    {
      subheader: 'Monitoruj swoje postępy',
      title: 'Korzystaj ze wskaźników, które pokazują realny wzrost Twojego warsztatu',
      description:
        'ServiceBoost daje Ci pełną kontrolę nad tym, co dzieje się w firmie — w czasie rzeczywistym. Analizuj kluczowe dane, wyciągaj wnioski i podejmuj lepsze decyzje każdego dnia.',
      accordion: [
        {
          title: 'Jak uzyskać dostęp do aplikacji?',
          content:
            'Dostęp do ServiceBoost nadaje wyłącznie administrator–właściciel warsztatu. Po otrzymaniu danych logowania możesz je zmienić i dostosować do swoich preferencji. Właściciel firmy może również dodawać pracowników oraz zarządzać ich rolami i uprawnieniami.',
        },

        {
          title: 'Czy aplikacja działa na telefonie?',
          content:
            'Tak. ServiceBoost jest w pełni responsywny — działa płynnie na komputerach, tabletach i smartfonach, bez konieczności instalowania dodatkowych aplikacji.',
        },

        {
          title: 'Czy aplikacja jest zgodna z WCAG?',
          content:
            'Tak. Platforma spełnia standardy dostępności WCAG, oferując m.in. tryb wysokiego kontrastu, skalowanie tekstu oraz kolorystykę przyjazną osobom niedowidzącym i z daltonizmem.',
        },

        {
          title: 'Czy moje dane są bezpieczne?',
          content:
            'Tak. System wykorzystuje role‑based access, szyfrowanie oraz panel właściciela do pełnej kontroli użytkowników. Każdy widzi tylko to, do czego ma uprawnienia.',
        },

        {
          title: 'Czy mogę dodać pracowników do systemu?',
          content:
            'Tak. Właściciel warsztatu może tworzyć konta pracowników, przypisywać im role oraz zarządzać ich dostępami w dowolnym momencie.',
        },
        {
          title: 'Czy mogę śledzić statystyki i wyniki firmy?',
          content:
            'Oczywiście. ServiceBoost oferuje rozbudowany dashboard z kluczowymi wskaźnikami — zlecenia, przychody, obłożenie pracowników, najpopularniejsze usługi i wiele więcej.',
        },
      ],
    },
  ];

  today = new Date();
  year = this.today.getFullYear();
}
