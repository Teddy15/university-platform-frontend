const AccountOverview = ({ text1, text2, className }) => {
    return (
        <div className={`${className}`}>
            <span>
                {text1} {text2}
            </span>
        </div>
    );
};

export default AccountOverview;