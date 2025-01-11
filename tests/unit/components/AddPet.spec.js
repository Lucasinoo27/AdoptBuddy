/* eslint-env jest */
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { createRouter, createWebHistory } from "vue-router";
import AddPet from "@/components/AddPet.vue";

// Mock child components
jest.mock("@/components/ImageUploader.vue", () => ({
  name: "ImageUploader",
  template: "<div class='mock-image-uploader'></div>",
  emits: ["image-selected", "image-removed"],
}));

jest.mock("@/components/StatusMessage.vue", () => ({
  name: "StatusMessage",
  template: "<div class='mock-status-message'></div>",
  emits: ["update:show"],
}));

describe("AddPet.vue", () => {
  let wrapper;
  let router;

  beforeEach(() => {
    // Create router instance
    router = createRouter({
      history: createWebHistory(),
      routes: [{ path: "/home", name: "Home" }],
    });

    // Mount component with dependencies
    wrapper = mount(AddPet, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: jest.fn,
          }),
          router,
        ],
      },
    });
  });

  it("validates required fields", async () => {
    // Try to submit empty form
    await wrapper.find("form").trigger("submit");

    // Check for validation errors
    const errors = wrapper.vm.errors;
    expect(errors.name).toBeTruthy();
    expect(errors.description).toBeTruthy();
    expect(errors.type).toBeTruthy();
    expect(errors.image).toBeTruthy();
  });

  it("validates name length", async () => {
    // Set invalid short name
    await wrapper.find("#petName").setValue("a");
    await wrapper.find("form").trigger("submit");

    expect(wrapper.vm.errors.name).toBe(
      "Name must be at least 2 characters long"
    );

    // Set valid name
    await wrapper.find("#petName").setValue("Max");
    await wrapper.find("form").trigger("submit");

    expect(wrapper.vm.errors.name).toBeFalsy();
  });

  it("validates description length", async () => {
    // Set invalid short description
    await wrapper.find("#description").setValue("short");
    await wrapper.find("form").trigger("submit");

    expect(wrapper.vm.errors.description).toBe(
      "Description must be at least 10 characters long"
    );

    // Set valid description
    await wrapper.find("#description").setValue("This is a valid description");
    await wrapper.find("form").trigger("submit");

    expect(wrapper.vm.errors.description).toBeFalsy();
  });

  it("validates age range", async () => {
    // Set invalid age
    await wrapper.find("#petAge").setValue(31);
    await wrapper.find("form").trigger("submit");

    expect(wrapper.vm.errors.age).toBe("Age must be between 0 and 30 years");

    // Set valid age
    await wrapper.find("#petAge").setValue(5);
    await wrapper.find("form").trigger("submit");

    expect(wrapper.vm.errors.age).toBeFalsy();
  });

  it("handles image upload", async () => {
    // Simulate image selection
    await wrapper.vm.handleImageSelected({
      dataUrl: "data:image/jpeg;base64,test",
    });

    expect(wrapper.vm.pet.image).toBe("data:image/jpeg;base64,test");
    expect(wrapper.vm.errors.image).toBeFalsy();

    // Simulate image removal
    await wrapper.vm.handleImageRemoved();

    expect(wrapper.vm.pet.image).toBe("");
  });

  it("submits form with valid data", async () => {
    // Fill form with valid data
    await wrapper.find("#petName").setValue("Max");
    await wrapper.find("#description").setValue("A friendly German Shepherd");
    await wrapper.find("#petType").setValue("Dog");
    await wrapper.find("#petAge").setValue(5);
    await wrapper.vm.handleImageSelected({
      dataUrl: "data:image/jpeg;base64,test",
    });

    // Submit form
    await wrapper.find("form").trigger("submit");

    // Check if store action was called
    const store = wrapper.vm.petStore;
    expect(store.addPet).toHaveBeenCalledWith({
      name: "Max",
      description: "A friendly German Shepherd",
      type: "Dog",
      age: 5,
      image: "data:image/jpeg;base64,test",
    });
  });

  it("shows loading state during submission", async () => {
    // Fill form with valid data
    await wrapper.find("#petName").setValue("Max");
    await wrapper.find("#description").setValue("A friendly German Shepherd");
    await wrapper.find("#petType").setValue("Dog");
    await wrapper.find("#petAge").setValue(5);
    await wrapper.vm.handleImageSelected({
      dataUrl: "data:image/jpeg;base64,test",
    });

    // Start submission
    const submitPromise = wrapper.vm.validateAndSubmit();

    // Check loading state
    expect(wrapper.vm.isSubmitting).toBe(true);

    // Wait for submission to complete
    await submitPromise;

    // Check loading state is cleared
    expect(wrapper.vm.isSubmitting).toBe(false);
  });

  it("shows success message and redirects after submission", async () => {
    // Fill form with valid data
    await wrapper.find("#petName").setValue("Max");
    await wrapper.find("#description").setValue("A friendly German Shepherd");
    await wrapper.find("#petType").setValue("Dog");
    await wrapper.find("#petAge").setValue(5);
    await wrapper.vm.handleImageSelected({
      dataUrl: "data:image/jpeg;base64,test",
    });

    // Mock router push
    const routerPushSpy = jest.spyOn(router, "push");

    // Submit form
    await wrapper.find("form").trigger("submit");

    // Check success message
    expect(wrapper.vm.statusMessage).toBe("Pet added successfully!");
    expect(wrapper.vm.statusType).toBe("success");
    expect(wrapper.vm.showStatus).toBe(true);

    // Wait for redirect delay
    await new Promise((resolve) => setTimeout(resolve, 1600));

    // Check redirect
    expect(routerPushSpy).toHaveBeenCalledWith({ name: "Home" });
  });
});
