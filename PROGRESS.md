# Javítandó dolgok hibák

- dropdown, transition-t bekell állítani, illetve kiválasztás után lehet hogy kaphatna egy focus-t, illetve nem szép a border kiemelés amikor kinyilik, meg talán annyi lehetne majd hogy, ami kivan választva azt a többi opció közül kiveszem, select-en javítani kell majd MEGOLDVA(kb fölesleges volt 2 külön komponens)
- headeren nem jól néz ki

- comment szekció a textarea és gomb magassága nem jól működik, flex rendezés esetén - MEGOLDVA
- comment szekció left border nem jó a magassága - MEGOLDVA

- mobil és tablet néezet más layout kell a comment thread megjelenítésére - MEGOLDVA(cdk breakpointal)
- Mobil menün javítani kell, backdrop + a sidebar alatti rész valamiért elmozdul

- sidebar, a badgek- valamiért extra spacing-et kapnak
- upvotes, beépítése(bár ez auth nélkül érdekes dolog... lehet később kellene egy login page és egy auth guard)

STORE, Service hiba

- ha magamnak replyolok, akkor a föcomment-hez rendereli a választ, magyarán nem jó comment id alá rakja a reply-t, ráadásul duplikáltan dolgozik, (ÍGY hagyom most)

Státuszok:

suggestion → még csak ötlet (nem a roadmap része)
planned → tervezve
in-progress → fejlesztés alatt
live → kész

# További ötletek,

- select, dropdown-hoz pici alpha amikor módosul a kiválasztott érték
