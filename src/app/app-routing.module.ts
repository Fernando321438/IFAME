import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login-register',
    pathMatch: 'full'
  },
  {
    path: 'choice-account',
    loadChildren: () => import('./choice-account/choice-account.module').then( m => m.ChoiceAccountPageModule)
  }, 
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then( m => m.RegistrationPageModule)
  },
  
  {
    path: 'verify-email',
    loadChildren: () => import('./verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
        path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'registration-artist',
    loadChildren: () => import('./registration-artist/registration-artist.module').then( m => m.RegistrationArtistPageModule)
  },
  {
    path: 'registration-crypto',
    loadChildren: () => import('./registration-crypto/registration-crypto.module').then( m => m.RegistrationCryptoPageModule)
  },
  {
    path: 'geolocalization',
    loadChildren: () => import('./geolocalization/geolocalization.module').then( m => m.GeolocalizationPageModule)
  },
  {
    path: 'view-artist',
    loadChildren: () => import('./view-artist/view-artist.module').then( m => m.ViewArtistPageModule)
  },
  {
    path: 'view-users',
    loadChildren: () => import('./view-users/view-users.module').then( m => m.ViewUsersPageModule)
  },
  {
    path: 'view-crypto',
    loadChildren: () => import('./view-crypto/view-crypto.module').then( m => m.ViewCryptoPageModule)
  },
  {
    path: 'view-musiccreators',
    loadChildren: () => import('./view-musiccreators/view-musiccreators.module').then( m => m.ViewMusiccreatorsPageModule)
  },
  {
    path: 'login-register',
    loadChildren: () => import('./login-register/login-register.module').then( m => m.LoginRegisterPageModule)
  },
  {
    path: 'login-utente',
    loadChildren: () => import('./login-utente/login-utente.module').then( m => m.LoginUtentePageModule)
  },
  {
    path: 'registration-musiccreators',
    loadChildren: () => import('./registration-musiccreators/registration-musiccreators.module').then( m => m.RegistrationMusiccreatorsPageModule)
  },
  {
    path: 'recorder',
    loadChildren: () => import('./recorder/recorder.module').then( m => m.RecorderPageModule)
  },
  {
    path: 'live',
    loadChildren: () => import('./live/live.module').then( m => m.LivePageModule)
  },
  
  
  
];

@NgModule({ 
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
