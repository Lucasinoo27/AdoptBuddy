/* eslint-env jest */
import { mount } from "@vue/test-utils";
import ImageUploader from "@/components/ImageUploader.vue";

describe("ImageUploader.vue", () => {
  let wrapper;
  const createFile = (size = 1024, type = "image/jpeg") => {
    return new File(["x".repeat(size)], "test.jpg", { type });
  };

  beforeEach(() => {
    wrapper = mount(ImageUploader, {
      props: {
        maxSize: 5,
        initialImage: "",
      },
    });
  });

  it("displays upload placeholder when no image is selected", () => {
    expect(wrapper.find(".upload-placeholder").exists()).toBe(true);
    expect(wrapper.find(".preview-image").exists()).toBe(false);
  });

  it("shows preview when initialImage prop is provided", async () => {
    await wrapper.setProps({ initialImage: "test-image.jpg" });
    expect(wrapper.find(".preview-image").exists()).toBe(true);
    expect(wrapper.find(".preview-image").attributes("src")).toBe(
      "test-image.jpg"
    );
  });

  it("validates file type", async () => {
    const invalidFile = new File(["content"], "test.txt", {
      type: "text/plain",
    });
    const input = wrapper.find('input[type="file"]');

    // Mock FileReader
    const mockFileReader = {
      readAsDataURL: jest.fn(),
      onload: null,
    };
    global.FileReader = jest.fn(() => mockFileReader);

    // Trigger file input change
    await input.trigger("change", {
      target: { files: [invalidFile] },
    });

    expect(wrapper.find(".alert-danger").text()).toContain(
      "Please select an image file"
    );
  });

  it("validates file size", async () => {
    const largeFile = createFile(6 * 1024 * 1024); // 6MB file
    const input = wrapper.find('input[type="file"]');

    await input.trigger("change", {
      target: { files: [largeFile] },
    });

    expect(wrapper.find(".alert-danger").text()).toContain(
      "File size should not exceed 5MB"
    );
  });

  it("shows loading state while processing image", async () => {
    const file = createFile();
    const input = wrapper.find('input[type="file"]');

    // Mock FileReader
    const mockFileReader = {
      readAsDataURL: jest.fn(),
      onload: null,
      onprogress: null,
    };
    global.FileReader = jest.fn(() => mockFileReader);

    // Trigger file input change
    await input.trigger("change", {
      target: { files: [file] },
    });

    expect(wrapper.vm.isLoading).toBe(true);

    // Simulate progress
    mockFileReader.onprogress({
      lengthComputable: true,
      loaded: 512,
      total: 1024,
    });
    expect(wrapper.vm.uploadProgress).toBe(50);

    // Simulate load completion
    mockFileReader.onload({
      target: { result: "data:image/jpeg;base64,test" },
    });

    // Wait for the loading delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    expect(wrapper.vm.isLoading).toBe(false);
    expect(wrapper.vm.uploadProgress).toBe(100);
  });

  it("emits image-selected event with file data", async () => {
    const file = createFile();
    const input = wrapper.find('input[type="file"]');

    // Mock FileReader
    const mockFileReader = {
      readAsDataURL: jest.fn(),
      onload: null,
    };
    global.FileReader = jest.fn(() => mockFileReader);

    // Trigger file input change
    await input.trigger("change", {
      target: { files: [file] },
    });

    // Simulate load completion
    mockFileReader.onload({
      target: { result: "data:image/jpeg;base64,test" },
    });

    // Wait for the loading delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    const emitted = wrapper.emitted("image-selected");
    expect(emitted).toBeTruthy();
    expect(emitted[0][0]).toHaveProperty("file");
    expect(emitted[0][0]).toHaveProperty("dataUrl");
  });

  it("emits image-removed event when remove button is clicked", async () => {
    // Set an initial image
    await wrapper.setProps({ initialImage: "test-image.jpg" });

    // Click remove button
    const removeButton = wrapper.find(".btn-outline-danger");
    await removeButton.trigger("click");

    expect(wrapper.emitted("image-removed")).toBeTruthy();
    expect(wrapper.vm.previewUrl).toBe("");
  });
});
