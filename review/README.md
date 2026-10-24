# Local review: Camp 3GRT X NGM

Local source: C:/Users/I DEWA GEDE ALAN D/muaythaischoolgarut
Preview: http://127.0.0.1:3187
Review prepared locally. Source publication was explicitly approved after visual review. No database migration or live CMS content save was performed.

Design read: a Muay Thai camp for beginners, children and athletes in Garut. Preserve the supplied identity, Oswald/Inter typography, actual camp imagery and published business information. Varied photo-led layouts; red chapters requested during visual review. Design variance 6, motion 4, visual density 4. Native CSS and existing React/Next.js components.

## Applied requests
- Hero photo covers the full width with a dark-to-transparent left-to-right gradient. Right side stays visible.
- Hero registration/program buttons and the About coach link removed.
- Values move left to right. Pause button removed at the user's request. Reduced-motion preference disables movement.
- All six training programs have an image and short description. Program photos can be changed through the existing CMS ImageField.
- Program, schedule, gallery and contact backgrounds are red, with restrained light and bright red accents.
- Pricing/name/link hover feedback and image zoom on hover.
- Transparent navigation blends with the background, with brighter text for contrast.
- Seeded testimonials and recognized unsupported sample statistics are omitted from presentation; saved CMS data is not changed.
- Numeric prices and quoted private-session prices are formatted separately. Package selection still preselects the contact form.
- Fixed fonts and existing/public images are available locally; WebP delivery images retain their originals.

## Validation scope
Passed: production build; responsive widths approximately 320, 360, 390, 768 and 1440 CSS pixels; mobile menu; bilingual text; FAQ state; timetable tabs; package preselection; all six program images; hover styles; source diff check. Backend form delivery and production CMS writes were not exercised.

## Generated program assets
Four illustrative images were made with the built-in imagegen tool. Originals: public/images/programs/*.png. Delivery images: public/images/programs/*.webp. Actual camp photos remain in public/images/camp. Illustrations do not represent named coaches or proof of a particular training session.

Prompt set (shared constraints: landscape 4:3, editorial photography, realistic textures/anatomy, charcoal/red palette, natural light, no text/logos/neon/smoke):
1. Group Training: three adult trainees practicing straight punches together on dark mats; side crop primarily showing torsos, arms and red/black gloves; no identifiable faces.
2. Personal Training: an adult trainee's red glove meeting a coach's black focus mitt during a one-to-one technique drill; close-up hands/forearms, faces outside frame.
3. Weight Training: adult athlete hands gripping an unbranded barbell with modest black plates, black training shorts and a red hand wrap; low angle on rubber gym flooring, no identifiable face.
4. Diet and Nutrition: overhead view of a simple Indonesian meal with rice, grilled chicken, tempeh, vegetables, cut fruit and water, on a charcoal tabletop with a red hand wrap at the edge.

Run locally with npm.cmd run dev -- --hostname 127.0.0.1 --port 3187, or after a build npm.cmd run start -- --hostname 127.0.0.1 --port 3187.
