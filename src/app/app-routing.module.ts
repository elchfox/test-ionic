import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ProductCardComponent } from './modules/product-card/components/product-card.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    title:"Home",
    canActivate:[AuthGuard],
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'login',
    title:"Login",
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'product/:id',
    title:"Product",
    canActivate:[AuthGuard],
    loadChildren: () =>
      import('./pages/product/product.module').then((m) => m.ProductPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
