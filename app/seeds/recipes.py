from app.models import db, Recipe

def seed_recipes():
    r1 = Recipe(
        user_id='1', title='Birria Tacos', image_url='https://www.simplyrecipes.com/thmb/McnGMrSn8QZGQI-CPukkSllZgu8=/720x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Birria-Tacos-LEAD-07-800cb0c73bdb4d32acfec9853ae2ed35.jpg', category_id='3', prep_time='10 mins', cook_time='30 mins', total_time='40 mins', servings='16 servings', directions="1. Reheat 4 cups of consome. Once it comes up to a boil, lower the heat to a simmer and keep the lid on. \n 2. In a large frying pan set over medium heat, heat 1 tablespoon olive oil. When the oil is hot and rippling, but not smoking, dip a tortilla into the consomé, covering both sides with it. Fill the tortilla with 2 tablespoons birria meat and 1 tablespoon cheese. Transfer it into the hot pan, don’t fold it in half yet. Once the bottom of the tortilla turns lightly golden brown, fold it in half. Cook both sides until the cheese is melted and the tortillas are a deeper golden brown. Cook 2 to 3 tacos at a time following this process and adding more oil to the pan, as needed. \n 3. Transfer the tacos onto a plate and serve with the onions and cilantro scattered on top and lime wedges on the side. Provide each guest with a small bowl of warm consomé for dipping. Enjoy!The best birria tacos are freshly made, but leftover tacos and consomé can be tightly covered and refrigerated, separately, for up to 3 days. To reheat, simply place the tacos on a pan over medium-low heat and cover with a lid. Warm them up for 2 to 3 minutes on each side. Reheat the consomé separately in a small saucepan. "
    )
    r2 = Recipe(
        user_id='1', title='Easy Crispy Tofu', image_url='https://www.simplyrecipes.com/thmb/R6Z9l85DmSzgk_MXh4K_bvgymws=/648x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Crispy-Tofu-LEAD-07-f828d15f6bba43c18edab27d8bf69059.jpg', category_id='7', prep_time='40 mins', cook_time='20 mins', total_time='60 mins', servings='2 to 3 servings',directions="1. Line the bottom of a 9 x 5-inch loaf pan with 4 or 5 paper towels or a folded, clean kitchen towel. Place the tofu on top, centered in the pan. Top it with another stack of paper towels or kitchen towel. Nestle in a second loaf pan so it sits right on top of the towel-covered tofu. Fill the top pan with 3 canned goods or any heavy items that’ll fit. Let sit for 30 minutes or up to an hour. The towels should be saturated, and the tofu should feel much drier to the touch. \n 2. Arrange a rack in the center of the oven and preheat it to 425°F. Line a baking sheet with parchment paper or a silicone mat and spray it generously with cooking spray. \n 3. In a medium bowl, add the soy sauce, vegetable oil, sesame oil, rice vinegar, and sugar. Whisk together with a fork or small whisk until the sugar is dissolved, about 30 seconds. In a small bowl, combine the cornstarch, breadcrumbs, salt, and black pepper and mix. Set both bowls aside. \n 4. Remove the tofu from the press and place it on a cutting board. Set the tofu up on its longest side and slice it lengthwise into 2 thin rectangles. Lay them flat on top of each other and make 3 equal cuts lengthwise followed by 2 cuts crosswise, making 24 equal cubes. \n 5. Add the cubed tofu into the marinade and use a rubber spatula or large wooden spoon to gently toss them to evenly coat. Be careful not to break up the tofu. It’s okay if there’s a little marinade left in in the bowl. \n 6. Add the breading over the marinated tofu and toss gently but thoroughly, coating the cubes on all sides. You might have some crumbs stuck to the bowl; you can discard them or toast them in a small pan to serve on top of the crispy tofu. \n 7. Scatter the tofu on the prepared baking sheet an inch or so apart from each other. Spray the tops generously with cooking spray. Bake until the tofu is browned and crispy, 20 to 25 minutes. Serve warm. Refrigerate leftovers for up to 4 days. I don’t recommend freezing crispy tofu. Reheat in a nonstick pan over medium heat with a little oil or in a 350°F oven until warmed through."
    )
    r3 = Recipe(
        user_id='1', title='Gholpy (Afghan Stewed Cauliflower)', image_url='https://www.simplyrecipes.com/thmb/rD6Oj1asW3MrLaPjweqYCwkAQN8=/648x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Gholphi-Afghan-Stewed-Cauliflower-LEAD-01-c3d3b50d172d440fbdf50e013454f9b2.jpg', category_id='3', prep_time='10 mins', cook_time='25 mins', total_time='35 mins', servings='4 to 6 servings', directions="1. In a ghablama, wok, or large sauté pan set over medium-high heat, add the onions. Sauté them, without any oil for about 4 minutes, until they soften, keeping a lid on as much as possible to trap steam. It’s okay if they brown around the edges. If they start charring, lower the heat and continue stirring. Stir in the oil and reduce the heat to medium. Continue to sauté for about 2 minutes, until the onions are tender and translucent. \n 2. Cut off the stem and thinly slice 1 Anaheim pepper. Add the sliced peppers, tomato paste, curry powder, advieh, felfel, black pepper, and turmeric to the cooked onions. Sauté for about 2 minutes, stirring frequently. \n 3. Stir in the cauliflower florets, 3/4 cup water, and salt. Cover with a lid and cook for 12 to 15 minutes, stirring occasionally, until you can easily pierce the florets with the tip of a paring knife. Taste the sauce and season with more salt, if needed. \n 4. Set a small frying pan over medium-high heat. When it’s hot, add the remaining 2 Anaheim peppers. Do not move them until they start to char, then turn them every 2 to 3 minutes to char them all over. This will create some peppery smoke, so open your windows! \n 5. Transfer the gholpi onto a serving platter, being careful not to break or smash the florets. Set the charred peppers on top and serve warm with barbari or lavash. Leftovers can be refrigerated for up to 5 days."
    )
    r4 = Recipe(
        user_id='1', title='Tteokbokki (Spicy Korean Rice Cakes)', image_url='https://www.simplyrecipes.com/thmb/du62bAe93H4zRiFcFRtKaRuJGRo=/648x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Tteokbokki-LEAD-9c-3ec2d7906ea748d0ab866e81dd653704.jpg', category_id='6', prep_time='5 mins', cook_time='25 mins', total_time='30 mins', servings='2 to 4 servings', directions="1. Fill a medium bowl with ice water and set it aside. Fill a small saucepan with 3 inches of water, enough to fully submerge the eggs. Do not add the eggs yet. Bring it up to a boil over medium-high heat. As soon as the water boils, carefully add the eggs. Mine are cold straight from the fridge. Cook them for 8 minutes. Using a large spoon, transfer the eggs into the prepared ice water to stop them from cooking. When the eggs feel cold to the touch, peel and cut them in half lengthwise. Set them aside. \n 2. In a 12-inch skillet over medium-high heat, add the oil and heat it until hot (rippling, but not smoking). Add the onions, cabbage, and garlic and cook, stirring frequently with a large spoon, for about 3 minutes. The vegetables should be translucent and a little browned. \n 3. Add the water, tteok, scallions, gochujang, soy sauce, and sugar. Stir until the gochujang is fully dissolved into the sauce. \n 4. Bring the sauce to a boil, then reduce the heat to low and simmer, stirring occasionally, about 10 minutes. Nudge the tteok to submerge them into the sauce as much as possible. The sauce will reduce and thicken, and the tteok will look glossy. When cooked properly, the tteok is a little chewy, tender, but not mushy. You should be able to cut it with a gentle wiggle with the side of your spoon. \n 5. Stir in the sesame oil. Taste the sauce and adjust seasoning with more soy sauce or sugar. The sauce should be flavorful and a little sweet to balance out the spiciness. \n 6. Transfer the tteokbokki to a serving platter. Sprinkle the sesame seeds all over and serve it with the hard-boiled eggs. The perfect bite: Blanket a tteok with a piece of onion and cabbage. Dunk the whole thing into the sauce. Follow with a cooling bite of egg.."
    )
    r5 = Recipe(
        user_id='1', title='Chocolate Pound Cake', image_url='https://www.simplyrecipes.com/thmb/khIbhgpoO0AKklAX71dMniJfjJo=/648x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Chocolate-Pound-Cake-Lead-5-29253e3587cb40699177de6f66a9d291.jpg', category_id='4', prep_time='15 mins', cook_time='65 mins', total_time='2 hrs 20 mins mins', servings='8 to 10 servings', directions="1. Preheat the oven to 350°F. Spray an 8 1/2 x 4 1/2-inch loaf pan with nonstick cooking spray. Line the pan with parchment paper, leaving a 2-inch overhang on two of the sides. Set it aside. \n 2. Place the espresso powder and 3/4 cup (163g) chocolate chips in a large bowl. Pour in the boiling water and let it sit for 5 minutes. Then, whisk together until smooth. \n 3. Whisk in the brown sugar, melted butter, vegetable oil, and vanilla until smooth. Add the eggs and whisk until fully combined. \n 4. Set a sifter or fine mesh sieve over a medium bowl. Add the flour, cocoa powder, baking soda, and salt, and sift. Whisk to combine. \n 5. Use a rubber spatula to fold the flour mixture into the chocolate mixture until just combined. \n 6. Fold in the remaining 3/4 cup (163g) chocolate chips. \n 7. Scrape the batter into the prepared loaf pan. Bake until the loaf has risen and cracked a bit on the top, 65 to 75 minutes. A toothpick inserted into the center should come out with just a few moist crumbs, but no wet batter. \n 8. Remove the pan from the oven and set it on a wire rack to cool for about 1 hour. Use the parchment sling to lift the loaf out. Slice and serve at room temperature."
    )
    r6 = Recipe(
        user_id='1', title='Tepache', image_url='https://www.simplyrecipes.com/thmb/JDpROLMALohjGErctQdElKLvwYE=/648x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Tepache-LEAD-02-aecaed38f3fa430fafc4bc4b3754f4d2.jpg', category_id='5', prep_time='10 mins', cook_time='48 hrs', total_time='48 hrs 10 mins', servings='8 to 10 servings', directions="1. In a small saucepan, combine the piloncillo, cinnamon stick, cloves, and 1 cup water. Set it over high heat and bring it to just under a boil—large bubbles should start to form around the edges. Immediately reduce the heat to low, stirring constantly to dissolve the sugar. Once the sugar has dissolved, remove the saucepan from the heat and let the mixture cool to room temperature. \n 2. Thoroughly wash the outside of your pineapple with running water making sure to remove all the dirt and debris. \n 3. Place the pineapple on a large cutting board. Use a sharp chef’s knife to slice the crown- and root-end off and discard them. Stand the pineapple upright on its flat base so that it doesn’t roll around. Starting from the top, slice off the skin, leaving about 1/4 inch to 1/2 inch of fruit attached. Cut the skin into 2- to 3-inch pieces. Place them into a nonreactive (glass, stainless steel, or ceramic, but not plastic) container that can hold at least 3 quarts. With the pineapple still upright, cut off the edible part, working around the core. Cut the core into 1-inch chunks and place them in the container with the skin. The rest of the pineapple is for you to enjoy! \n 4. Add the cooled syrup and the remaining almost 2 quarts filtered water. Stir to combine. \n 5. Cover the container with a clean cheesecloth or tea towel. Use a rubber band to secure it. Place the container in a warm spot away from sunlight. The ideal temperature is between 70°F and 80°F. \n .6 If the spot is warm (over 85°F), check the tepache after 12 hours. Wait at least 24 hours if it’s cooler. Small bubbles will begin to form around the top edges as it ferments. Use a slotted spoon to remove any white foam on top; it is harmless. More bubbles will form over time, and the mixture will smell a little sour, like beer. You can taste it at this point with a spoon or a straw—stick it into the liquid and cover the top of the straw with a finger to trap the liquid in the straw. The ideal taste comes down to your preference—some batches will taste sweeter, funkier, or more sour than others. At the ideal temperature, it takes about 2 days for the tepache to reach the perfect balance of sour, sweet, and light carbonation. If cooler, it can take up to 5 days. \n 7. Set a nut bag or fine mesh strainer lined with cheesecloth over a large nonreactive bowl or jug. Strain the tepache into it. Let it sit for about 15 minutes to fully drain and discard the fruit. \n 8. Serve the tepache over ice and garnish with a slice of pineapple. Tepache can be refrigerated for up to 1 week. Do not cover it tightly. It will continue to ferment even in the fridge, so if stored for any longer, it will turn into vinegar."
    )

    db.session.add_all([r1, r2, r3, r4, r5, r6])

    db.session.commit()

def undo_recipes():
    db.session.execute('TRUNCATE recipes RESTART IDENTITY CASCADE;')
    db.session.commit()
