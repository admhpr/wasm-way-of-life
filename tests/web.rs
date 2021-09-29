#![cfg(target_arch = "wasm32")]

extern crate wasm_bindgen_test;
extern crate wasm_way_of_life;
use wasm_bindgen_test::*;
use wasm_way_of_life::Universe;

wasm_bindgen_test_configure!(run_in_browser);


#[cfg(test)]
pub fn generate_input() -> Universe {
    let mut universe = Universe::new();
    universe.set_width(6);
    universe.set_height(6);
    universe.set_cells(&[(1,2), (2,3), (3,1), (3,2), (3,3)]);
    universe
}

#[cfg(test)]
pub fn generate_expected_after_one_tick() -> Universe {
    let mut universe = Universe::new();
    universe.set_width(6);
    universe.set_height(6);
    universe.set_cells(&[(2,1), (2,3), (3,2), (3,3), (4,2)]);
    universe
}

#[wasm_bindgen_test]
pub fn test_tick() {
    // Let's create a smaller Universe with a small spaceship to test!
    let mut input_universe = generate_input();

    let expected_universe = generate_expected_after_one_tick();

    // Call `tick` and then see if the cells in the `Universe`s are the same.
    input_universe.tick();
    assert_eq!(&input_universe.get_cells(), &expected_universe.get_cells());
}
