import { Component, HostListener, Input } from '@angular/core';
import { Bula } from '../../models/Bula.model';

@Component({
  selector: 'app-gsap',
  templateUrl: './bulas-carousel.component.html',
  styleUrls: ['./bulas-carousel.component.css']
})
export class BulasCarouselComponent {
  public bulas: Bula[] = [/*
    new Bula("#OffreEmploi Développeur Angular en CDI, salaire attractif #JobPosting", "devjobs", 1560, 719),
    new Bula("Leçon de cuisine : comment faire une tarte aux pommes #RecetteFacile", "maman_cuisine", 354, 63),
    new Bula("Nouvelle vidéo sur ma chaîne Youtube : apprendre à jouer de la guitare #Musique", "guitarhero", 1789, 321),
    new Bula("Macaque à vendre 4000€ cash. reste plus rien presque #LesChinoisRestezOuVousEtes", "pessi2012", 1251, 433),
    new Bula("Comment économiser de l'argent en achetant d'occasion #BonPlan", "econome", 895, 215),
    new Bula("Nouvelle collection de vêtements pour homme #ModeMasculine", "fashionista", 230, 54),
    new Bula("J'ai commencé un nouveau livre, il est passionnant ! #LectureDuMoment", "bookworm", 1357, 491),
    new Bula("Je vais bientôt partir en vacances, des idées de destination ? #Travel", "wanderlust", 678, 112),
    new Bula("J'ai enfin réussi à faire mon premier plat végétarien, c'était délicieux ! #CuisineVégé", "veggiecooking", 432, 89),
    new Bula("Comment améliorer son anglais en 3 mois #LangueEtrangere", "polyglotte", 1045, 327)
*/];
  currentIndex = 0;

  get prevIndex() {
    return this.currentIndex === 0 ? this.bulas.length - 1 : this.currentIndex - 1;
  }

  get nextIndex() {
    return this.currentIndex === this.bulas.length - 1 ? 0 : this.currentIndex + 1;
  }

  @HostListener('wheel', ['$event'])
  onScroll(event: WheelEvent) {
    if (event.deltaY > 0) {
      this.currentIndex = this.nextIndex;
    } else {
      this.currentIndex = this.prevIndex;
    }
  }
}
