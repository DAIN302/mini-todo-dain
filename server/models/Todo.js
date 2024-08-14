// Todo table structure
// 시퀄라이즈 모델과 mysql table 연결
const Todo = function(Sequelize, DataTypes){
    // Sequlize - model/index.js 에서의 sequelize 
    // DataTypes - model/index.js 에서의 Sequlize
    const model = Sequelize.define(
        'todo', // model 이름 설정
        {
            id : {
                type : DataTypes.INTEGER,
                allowNull : false,
                primaryKey : true,
                autoIncrement : true,
            },
            title : {
                type : DataTypes.STRING(100),
                allowNull : false,
            }, 
            done : {
                type : DataTypes.BOOLEAN,
                allowNull : false,
                defaultValue : false,
            }
        }, // params2 : column
        {
            tableName : 'todo', // 실제 db 테이블 이름
            freezeTableName : true, // sequelize 가 테이블 이름을 자동으로 복수형으로 만들지 않도록 설정
            timestamps : false, // table createAt, updateAt 타임스탬프 컬럼을 자동으로 추가하지 않도록 설정

        } // params3 모델의 옵션 정의
    );

    return model;
}

module.exports = Todo;

// 시퀄라이즈는 기본적으로 다음과 같이 사용
// 모델 이름 - 단수형
// 테이블 이름 - 복수형