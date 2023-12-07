import {
  create_data,
  get_all_data,
  get_data_by_id,
  updata_data,
  delete_data,
  login,
} from "../controller";
import Student from "../../model/model";

const mockResponse = () => {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
};

afterEach(() => {
  // Clear the cache after each tests to reset any previous state of mocks
  jest.restoreAllMocks();
});

describe("register user", () => {
  test("check for validate request and response ", async () => {
    const mockRequest = () => {
      return {
        body: {
          name: "test user",
          email: "test@gmail.com",
          password: "123456",
          password_confirmation: "123456",
        },
      };
    };
    const mockUser = {
      _id: "63639e9436ed911b0454a9f5",
      name: "test user",
      email: "test@gmail.com",
      password: "13456",
      password_confirmation: "123456",
    };
    jest.spyOn(Student, "create").mockResolvedValueOnce(mockUser);
    const mockRes = mockResponse();
    const mockReq = mockRequest();

    await create_data(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(Student.create).toHaveBeenCalledWith({
      name: "test user",
      email: "test@gmail.com",
      password: "123456",
      password_confirmation: "123456",
    });
    expect(Student.create).not.toEqual(undefined);
  });

  test("checking undefined fields", async () => {
    const mockReq = {
      body: {
        email: "",
        password: "",
        name: "",
      },
    };
    const mockRes = mockResponse();
    await create_data(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "all fields are required!",
    });
  });

  test("checking error of catch block", async () => {
    const mockRes = mockResponse();
    await create_data({}, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(500);
  });
});

describe(" user list", () => {
  test("get all user list", async () => {
    const mockRes = mockResponse();
    const mockReq = { body: {} };
    jest.spyOn(Student, "find").mockResolvedValueOnce();
    await get_all_data(mockReq, mockRes);
    expect(Student.find).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
  });

  test("checking error", async () => {
    const mockReq = { body: {} };
    const mockRes = mockResponse();
    jest.spyOn(Student, "find").mockRejectedValueOnce({ status: 500 });

    await get_all_data(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(500);
  });
});

describe("single user", () => {
  test("get single user by id", async () => {
    const mockReq = {
      params: { id: "1" },
    };
    const mockRes = mockResponse();
    const mockUser = {
      id: 1,
      name: "test",
      email: "test@gmail.com",
      password: "123456",
    };

    jest.spyOn(Student, "findById").mockResolvedValueOnce(mockUser);

    await get_data_by_id(mockReq, mockRes);

    expect(Student.findById).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
  });

  test("should return 404 with 'Not found' message when student is not found", async () => {
    const mockReq = {
      params: { id: "123" },
    };
    const mockRes = mockResponse();

    jest.spyOn(Student, "findById").mockResolvedValue(null);

    await get_data_by_id(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({ message: "Not found" });
  });

  test("should return 500 error message", async () => {
    const mockReq = { params: { id: "abc" } };
    const mockRes = mockResponse();
    jest.spyOn(Student, "findById").mockRejectedValueOnce();

    await get_data_by_id(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Internal Server Error",
    });
  });
});

describe("update user", () => {
  test("update user profile", async () => {
    const mockRes = mockResponse();
    const mockReq = {
      body: {},
      params: { id: "123" },
    };

    jest.spyOn(Student, "findByIdAndUpdate").mockResolvedValueOnce();

    await updata_data(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
  });
});

describe("delete user", () => {
  test("deletes a single record", async () => {
    const mockReq = {
      params: { id: " 123" },
    };
    const mockRes = mockResponse();

    jest.spyOn(Student, "findByIdAndDelete").mockResolvedValueOnce();

    await delete_data(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
  });
  test("check error", async () => {
    const mockReq = {
      params: { id: " 123" },
    };
    const mockRes = mockResponse();

    jest.spyOn(Student, "findByIdAndDelete").mockRejectedValueOnce();

    await delete_data(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Internal Server Error",
    });
  });
});

describe("login user", () => {
  test("login user email", async () => {
    const mockReq = {
      body: {
        email: "test@gmail.com",
        password: "password",
      },
    };

    const mockRes = mockResponse();

    jest.spyOn(Student, "findOne").mockResolvedValueOnce({
      email: "test@gmail.com",
      password: "password",
    });

    await login(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
  });

  test("checking error", async () => {
    const mockReq = {
      body: {
        email: "test@gmail.com",
        password: "password",
      },
    };

    const mockRes = mockResponse();

    jest.spyOn(Student, "findOne").mockResolvedValueOnce({
      email: "test@gmail.com",
      password: "password@123",
    });

    await login(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "invalid credential",
    });
  });
});
