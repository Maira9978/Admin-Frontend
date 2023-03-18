import React, { useState, useEffect, useMemo, useCallback } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";
import moment from "moment";

function ManageType() {
  const [categoryList, setCategoryList] = useState([]);
  const [newType, setNewType] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editingCategoryName, setEditingCategoryName] = useState("");
  const [questions, setQuestions] = useState([]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:2000/api/deletecategory/${id}`);
      setCategoryList((prevCategoryList) =>
        prevCategoryList.filter((category) => category.id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };
  const getQuestions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:2000/api/viewquestion"
      );
      setQuestions(response.data.question);
    } catch (error) {
    }
  };
  const getQuestionsCount = (categoryId) => {
    getQuestions();
    questions.filter((question) => question.category);

    const filteredQuestions = questions.filter(
      (question) => question.categories === categoryId
    );
    return filteredQuestions.length;
  };
  const handleSearch = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:2000/api/searchCategory?q=${searchKeyword}`
      );
      const searchResults = response.data.categories;
      setCategoryList(searchResults);
    } catch (error) {
      console.log(error);
    }
  }, [searchKeyword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:2000/api/addCategory",
        {
          cName: newType,
        }
      );
      setCategoryList((prevCategoryList) => [
        ...prevCategoryList,
        response.data,
      ]);
      setNewType("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async (id) => {
    try {
      await axios.put(`http://localhost:2000/api/editcategory/${id}`, {
        cName: editingCategoryName,
      });
      setCategoryList((prevCategoryList) =>
        prevCategoryList.map((category) =>
          category.id === id
            ? { ...category, name: editingCategoryName }
            : category
        )
      );
      setEditingCategoryId(null);
      setEditingCategoryName("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSort = useCallback(() => {
    setCategoryList((prevCategoryList) =>
      sortOrder === "asc"
        ? [...prevCategoryList].sort((a, b) => a.name.localeCompare(b.name))
        : [...prevCategoryList].sort((a, b) => b.name.localeCompare(a.name))
    );
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  }, [sortOrder]);

  const getCategories = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:2000/api/viewcategory"
      );
      const categories = response.data.category.map((category) => ({
        id: category.id,
        name: category.cName,
        createdAt: moment(category.createdAt).format("MM/DD/YYYY hh:mm:ss A"),
      }));
      setCategoryList(categories);
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const filteredCategories = useMemo(() => {
    return categoryList.filter(
      (category) =>
        category.name &&
        category.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }, [categoryList, searchKeyword]);

  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main">
        <Navbar />
        <main className="content">
          <div className="container-fluid p-0">
            <div className="row">
              <div
                className="col-12 col-lg-8 col-xxl-9 d-flex"
                style={{ width: "100%" }}
              >
                <div className="card flex-fill">
                  <div className="card-header">
                    <h5 className="card-title mb-0">Manage Types</h5>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      <div className="input-group mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="New Type"
                          value={newType}
                          onChange={(e) => setNewType(e.target.value)}
                        />
                        <button className="btn btn-primary" type="submit">
                          Add
                        </button>
                      </div>
                    </form>
                    <div className="d-flex justify-content-between">
                      <div
                        className="input-group mb-3"
                        style={{ width: "45%" }}
                      >
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search Types"
                          value={searchKeyword}
                          onChange={(e) => setSearchKeyword(e.target.value)}
                        />
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          onClick={handleSearch}
                        >
                          Search
                        </button>
                      </div>
                      <div>
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          onClick={handleSort}
                        >
                          Sort by Name {sortOrder === "asc" ? "▲" : "▼"}
                        </button>
                      </div>
                    </div>
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Created At</th>
                            <th>Count</th>
                            <th>Actions</th>
                           
                          </tr>
                        </thead>
                        <tbody>
                          {filteredCategories.map((category) => (
                            <tr key={category.id}>
                              {editingCategoryId === category.id ? (
                                <>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Type name"
                                      value={editingCategoryName}
                                      onChange={(e) =>
                                        setEditingCategoryName(e.target.value)
                                      }
                                    />
                                  </td>
                                  <td></td>
                                  <td>
                                    <button
                                      className="btn btn-success"
                                      onClick={() =>
                                        handleSave(editingCategoryId)
                                      }
                                      disabled={!editingCategoryName}
                                    >
                                      Save
                                    </button>
                                    <button
                                      className="btn btn-secondary"
                                      style={{ marginLeft: "10px" }}
                                      onClick={() => {
                                        setEditingCategoryId(null);
                                        setEditingCategoryName("");
                                      }}
                                    >
                                      Cancel
                                    </button>
                                  </td>
                                  <td></td>
                                </>
                              ) : (
                                <>
                                  <td>{category.name}</td>
                                  <td>{category.createdAt}</td>
                                  <td>{getQuestionsCount(category.id)}</td>
                                  <td>
                                    <button
                                      className="btn btn-danger"
                                      onClick={() => handleDelete(category.id)}
                                    >
                                      Delete
                                    </button>
                                    <button
                                      className="btn btn-primary"
                                      style={{ marginLeft: "10px" }}
                                      onClick={() => {
                                        setEditingCategoryId(category.id);
                                        setEditingCategoryName(category.name);
                                      }}
                                    >
                                      Edit
                                    </button>
                                  </td>
                                 
                                </>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
export default ManageType;
