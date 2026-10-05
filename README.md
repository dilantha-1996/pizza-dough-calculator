# Pizza Pan Calculator

A small Angular + Tailwind CSS app for checking whether the current shared pizza-pan pool is enough for the next dough batch.

## Defaults

- Total dough mixture: 18 kg
- Classic: 270 g
- Mini: 160 g
- XL: 400 g
- Cheesy Crust: 300 g
- Current pans: 0 for every type

All values are editable. There is no API and no database; calculations run in the browser.

## Calculation

The user enters the desired Mini, XL and Cheesy Crust quantities. The app reserves those quantities first and uses the remaining dough for Classic balls.

Example:

- 18,000 g batch
- 10 Mini × 160 g = 1,600 g
- 5 XL × 400 g = 2,000 g
- Remaining = 14,400 g
- Classic = floor(14,400 / 270) = 53
- Required shared pans = 10 + 5 + 53 = 68

The four current-pan inputs are added together. If total current pans >= required pans, the result is **YES — ENOUGH PANS**; otherwise it shows the shortage.

## Run locally

Angular 21 is used in this project. Angular 21 supports Node 22.12+; use a current Node 22 release.

```bash
npm install
npm start
```

Open the local address shown by Angular CLI.

## GitHub Pages

1. Create a new GitHub repository, for example `pizza-pan-calculator`.
2. Upload/push this project to the `main` branch.
3. Open **Settings → Pages** in the repository.
4. Under **Build and deployment**, select **GitHub Actions**.
5. Push to `main` again if needed. The included workflow builds and deploys the app automatically.
6. Your site will be available at the GitHub Pages URL shown by GitHub.
