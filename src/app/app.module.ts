import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { AboutItemComponent } from './components/about-item/about-item.component';
import { AcquaintanceComponent } from './components/acquaintance/acquaintance.component';
import { FooterComponent } from './components/footer/footer.component';
import { FooterSocialComponent } from './components/footer-social/footer-social.component';
import { HeaderComponent } from './components/header/header.component';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { HeaderMobComponent } from './components/header-mob/header-mob.component';
import { JumbotronComponent } from './components/jumbotron/jumbotron.component';
import { LoaderComponent } from './components/loader/loader.component';
import { MessageComponent } from './components/message/message.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { RequirementsComponent } from './components/requirements/requirements.component';
import { UserBlockComponent } from './components/user-block/user-block.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UsersComponent } from './components/users/users.component';
import { TokenInterceptor } from './helpers/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    AboutItemComponent,
    AcquaintanceComponent,
    FooterComponent,
    FooterSocialComponent,
    HeaderComponent,
    HeaderMenuComponent,
    HeaderMobComponent,
    JumbotronComponent,
    LoaderComponent,
    MessageComponent,
    RegistrationComponent,
    RequirementsComponent,
    UserBlockComponent,
    UserCardComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollToModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
