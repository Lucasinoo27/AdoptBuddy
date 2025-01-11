/* eslint-env jest */
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import FilterComponent from "@/components/FilterComponent.vue";

describe("FilterComponent.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(FilterComponent, {
      global: {
        plugins: [createTestingPinia()],
      },
    });
  });

  it("emits filter-change event when search input changes", async () => {
    const searchInput = wrapper.find("input[type='text']");
    await searchInput.setValue("test search");

    const emitted = wrapper.emitted("filter-change");
    expect(emitted).toBeTruthy();
    expect(emitted[0][0]).toHaveProperty("searchQuery", "test search");
  });

  it("emits filter-change event when pet type is selected", async () => {
    const typeSelect = wrapper.find("select");
    await typeSelect.setValue("Dog");

    const emitted = wrapper.emitted("filter-change");
    expect(emitted).toBeTruthy();
    expect(emitted[0][0]).toHaveProperty("selectedType", "Dog");
  });

  it("emits filter-change event when age range changes", async () => {
    const ageInput = wrapper.find("input[type='range']");
    await ageInput.setValue(15);

    const emitted = wrapper.emitted("filter-change");
    expect(emitted).toBeTruthy();
    expect(emitted[0][0]).toHaveProperty("maxAge", 15);
  });

  it("emits filter-change event when favorites filter is toggled", async () => {
    const favoritesCheckbox = wrapper.find("input[type='checkbox']");
    await favoritesCheckbox.setChecked(true);

    const emitted = wrapper.emitted("filter-change");
    expect(emitted).toBeTruthy();
    expect(emitted[0][0]).toHaveProperty("showFavoritesOnly", true);
  });

  it("emits filter-change event when sort option changes", async () => {
    const sortSelect = wrapper.find("select[aria-label='Sort by']");
    await sortSelect.setValue("name");

    const emitted = wrapper.emitted("filter-change");
    expect(emitted).toBeTruthy();
    expect(emitted[0][0]).toHaveProperty("sortBy", "name");
  });

  it("resets all filters when reset button is clicked", async () => {
    // Set some filters first
    await wrapper.find("input[type='text']").setValue("test");
    await wrapper.find("select").setValue("Dog");
    await wrapper.find("input[type='range']").setValue(15);
    await wrapper.find("input[type='checkbox']").setChecked(true);

    // Click reset button
    const resetButton = wrapper.find("button[type='reset']");
    await resetButton.trigger("click");

    const emitted = wrapper.emitted("filter-change");
    expect(emitted).toBeTruthy();
    const lastEmittedFilters = emitted[emitted.length - 1][0];
    expect(lastEmittedFilters).toEqual({
      searchQuery: "",
      selectedType: "",
      maxAge: 30,
      showFavoritesOnly: false,
      sortBy: "",
    });
  });

  it("displays current filter values correctly", async () => {
    // Set filter values
    await wrapper.find("input[type='text']").setValue("test");
    await wrapper.find("select").setValue("Dog");
    await wrapper.find("input[type='range']").setValue(15);

    // Verify displayed values
    expect(wrapper.find("input[type='text']").element.value).toBe("test");
    expect(wrapper.find("select").element.value).toBe("Dog");
    expect(wrapper.find("input[type='range']").element.value).toBe("15");
    expect(wrapper.find(".age-display").text()).toContain("15");
  });
});
