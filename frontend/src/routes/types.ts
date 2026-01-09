export type RootStackParamList = {
  SplashScreen: undefined;
  Login: undefined;
  Register: undefined;
  Dashboard: undefined;
  Search: undefined;
  SellTab: undefined;        // Step 1
  SellDetails: { formData: any };  // Step 2
  SellPricing: { formData: any };  // Step 3
  SellConfirm: { formData: any };  // Step 4
  SellListing: { formData: any }; 

};
