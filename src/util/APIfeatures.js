export class apiFeatures {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  pagination() {
    let page = this.queryString.page * 1 || 1;
    if (this.queryString.page <= 0) page = 1;
    let skip = (page - 1) * 5;
    this.page = page;
    this.mongooseQuery.skip(skip).limit(5);
    return this;
  }

  filter() {
    if (this.queryString.filter) {
      let filterObj = { ...this.queryString };
      let excludedQuery = ["page", "sort", "keywords", "fields"];

      excludedQuery.forEach((ele) => {
        delete filterObj[ele];
      });

      filterObj = JSON.stringify(filterObj);
      filterObj = filterObj.replace(
        /\bgt|gte|lt|lte\b/g,
        (match) => `$${match}`
      );

      this.mongooseQuery.find({ filterObj });
    }

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      let sortBy = this.queryString.sort.split(",").join(" ");
      this.mongooseQuery.sort(sortBy);
    }
    return this;
  }

  search() {
    if (this.queryString.keyword) {
      this.mongooseQuery.find({
        $or: [
          { title: { $regex: this.queryString.keyword, $options: "i" } },
          { description: { $regex: this.queryString.keyword, $options: "i" } },
        ],
      });
    }
    return this;
  }

  fields() {
    if (this.queryString.fields) {
      let fields = req.params.fields.split(",").join(" ");

      this.mongooseQuery.select(fields);
    }
    return this;
  }
}
